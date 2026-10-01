import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { authApi, setToken, getToken } from '@/utils/api';
import Swal, { getSwalOpts } from '@/utils/swal';

const SESSION_DURATION = 30 * 60 * 1000;  // 30 minutes inactivity timeout
const WARNING_BEFORE = 5 * 60 * 1000;     // 5 minutes before expiry
const WARNING_AT = SESSION_DURATION - WARNING_BEFORE; // 25 minutes
const TOKEN_REFRESH_INTERVAL = 10 * 60 * 1000; // Refresh JWT every 10 minutes of activity
const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

const SessionManager = () => {
  const { user, isAuthenticated, logout, login } = useAuth();
  const logoutTimerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const tokenRefreshTimerRef = useRef(null);
  const lastActivityRef = useRef(Date.now());
  const warningShownRef = useRef(false);

  const clearAllTimers = useCallback(() => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (tokenRefreshTimerRef.current) clearInterval(tokenRefreshTimerRef.current);
  }, []);

  const handleLogout = useCallback(() => {
    clearAllTimers();
    Swal.close();
    Swal.fire({ ...getSwalOpts(), icon: 'warning',
      title: 'Session Expired',
      text: 'Your session has timed out due to inactivity. Please log in again.',
      confirmButtonColor: '#d4a574',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(() => {
      logout();
      window.location.href = '/auth';
    });
  }, [logout, clearAllTimers]);

  // Refresh the JWT token to keep it valid while user is active
  const refreshToken = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) return;

      const res = await authApi.refreshToken();
      if (res.success && res.token) {
        setToken(res.token);
        if (res.user) login(res.token, res.user);
      }
    } catch (err) {
      console.error('Token refresh failed:', err);
    }
  }, [login]);

  const extendSession = useCallback(async () => {
    try {
      const res = await authApi.refreshToken();
      if (res.success && res.token) {
        setToken(res.token);
        if (res.user) login(res.token, res.user);
        lastActivityRef.current = Date.now();
        warningShownRef.current = false;
        Swal.close();
        resetTimers();
      } else {
        handleLogout();
      }
    } catch {
      handleLogout();
    }
  }, [handleLogout, login]);

  const showWarning = useCallback(() => {
    if (warningShownRef.current) return;
    warningShownRef.current = true;

    let countdown = Math.floor(WARNING_BEFORE / 1000);

    Swal.fire({ ...getSwalOpts(), title: 'Session Expiring Soon',
      html: `<p>Your session will expire in <strong id="session-countdown">${formatTime(countdown)}</strong></p><p class="text-sm text-gray-500 mt-2">Click "Extend Session" to continue working.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Extend Session',
      cancelButtonText: 'Log Out',
      confirmButtonColor: '#d4a574',
      cancelButtonColor: '#dc2626',
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: WARNING_BEFORE,
      timerProgressBar: true,
      didOpen: () => {
        const countdownEl = document.getElementById('session-countdown');
        const interval = setInterval(() => {
          countdown--;
          if (countdownEl) countdownEl.textContent = formatTime(countdown);
          if (countdown <= 0) clearInterval(interval);
        }, 1000);
      }
    }).then((result) => {
      if (result.isConfirmed) {
        extendSession();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        logout();
        window.location.href = '/auth';
      } else if (result.dismiss === Swal.DismissReason.timer) {
        handleLogout();
      }
    });
  }, [extendSession, handleLogout, logout]);

  const resetTimers = useCallback(() => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);

    // Warning at 25 minutes of inactivity
    warningTimerRef.current = setTimeout(() => {
      showWarning();
    }, WARNING_AT);

    // Auto-logout at 30 minutes of inactivity
    logoutTimerRef.current = setTimeout(() => {
      if (!warningShownRef.current) {
        handleLogout();
      }
    }, SESSION_DURATION);
  }, [showWarning, handleLogout]);

  const handleActivity = useCallback(() => {
    // Only reset if warning hasn't been shown yet
    if (!warningShownRef.current) {
      lastActivityRef.current = Date.now();
      resetTimers();
    }
  }, [resetTimers]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Initialize
    lastActivityRef.current = Date.now();
    warningShownRef.current = false;
    resetTimers();

    // Periodically refresh JWT to keep it valid while user is active
    tokenRefreshTimerRef.current = setInterval(() => {
      if (!warningShownRef.current) {
        refreshToken();
      }
    }, TOKEN_REFRESH_INTERVAL);

    // Listen for user activity
    ACTIVITY_EVENTS.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      clearAllTimers();
      ACTIVITY_EVENTS.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [isAuthenticated, user, resetTimers, handleActivity, refreshToken, clearAllTimers]);

  return null;
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default SessionManager;
