import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * SecurityGuard — Platform Security & Anti-Cheat System
 * 
 * Features:
 *  1. Right-Click Context Menu Blocking (+ User notification toast)
 *  2. DevTools Deactivation & Detection (+ Interactive Security Shield overlay)
 *  3. Screen Recording & Capture Deterrence (getDisplayMedia API block, blur on window focus loss, anti-print CSS)
 *  4. Fullscreen Enforcement (Interactive overlay on exit for user gesture compliance)
 *  5. Content & Copy Protection (Selective text selection & image drag blocking)
 */
const SecurityGuard = () => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isFullscreenRequired, setIsFullscreenRequired] = useState(false);
  const [isWindowBlurred, setIsWindowBlurred] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toastTimerRef = useRef(null);

  // Show a temporary security toast notification
  const showSecurityToast = useCallback((msg) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage('');
    }, 2500);
  }, []);

  // ─────────────── 1. BLOCK RIGHT-CLICK ───────────────
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    showSecurityToast('Right-click context menu is disabled for security.');
    return false;
  }, [showSecurityToast]);

  // ─────────────── 2. BLOCK KEYBOARD SHORTCUTS ───────────────
  const handleKeyDown = useCallback((e) => {
    const key = e.key ? e.key.toLowerCase() : '';
    const code = e.keyCode || e.which;

    // F12 key
    if (key === 'f12' || code === 123) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('F12 Developer Tools shortcut is disabled.');
      return false;
    }

    // Ctrl+Shift+I / J / C / K / M (Inspect, Console, Element Picker, Firefox DevTools)
    if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c', 'k', 'm'].includes(key)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Developer tools shortcut is disabled.');
      return false;
    }

    // Ctrl+U (View Source)
    if (e.ctrlKey && key === 'u') {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Viewing page source is disabled.');
      return false;
    }

    // Ctrl+S (Save Page)
    if (e.ctrlKey && key === 's' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Saving page is disabled.');
      return false;
    }

    // Block PrintScreen
    if (e.key === 'PrintScreen' || code === 44) {
      e.preventDefault();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('').catch(() => {});
      }
      showSecurityToast('Screen capturing is restricted.');
      return false;
    }

    // Block Ctrl+P (Print)
    if (e.ctrlKey && key === 'p') {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Printing page content is disabled.');
      return false;
    }
  }, [showSecurityToast]);

  // ─────────────── 3. DEVTOOLS DETECTION ───────────────
  const checkDevTools = useCallback(() => {
    // Check 1: Console getter inspection trick
    let devToolsDetected = false;
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: () => {
        devToolsDetected = true;
        return 'devtools-marker';
      }
    });

    // Trigger getter inspection if console is open
    // eslint-disable-next-line no-console
    console.log('%c', element);

    // Check 2: Outer vs Inner window dimension delta
    const widthDelta = window.outerWidth - window.innerWidth;
    const heightDelta = window.outerHeight - window.innerHeight;
    const isDockedDevTools = (widthDelta > 200 || heightDelta > 200) && !window.screenTop && !window.screenY;

    if (devToolsDetected || isDockedDevTools) {
      setIsDevToolsOpen(true);
    }
  }, []);

  // ─────────────── 4. FULLSCREEN ENFORCEMENT ───────────────
  const requestFullscreen = useCallback(() => {
    const elem = document.documentElement;
    const requestFS =
      elem.requestFullscreen ||
      elem.webkitRequestFullscreen ||
      elem.msRequestFullscreen ||
      elem.mozRequestFullScreen;

    if (requestFS && !document.fullscreenElement && !document.webkitFullscreenElement) {
      requestFS.call(elem)
        .then(() => {
          setIsFullscreenRequired(false);
        })
        .catch(() => {
          setIsFullscreenRequired(true);
        });
    }
  }, []);

  const handleFullscreenChange = useCallback(() => {
    const isFullscreen = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

    if (!isFullscreen) {
      setIsFullscreenRequired(true);
    } else {
      setIsFullscreenRequired(false);
    }
  }, []);

  // ─────────────── 5. FOCUS / VISIBILITY PRIVACY ───────────────
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      setIsWindowBlurred(true);
    } else {
      setIsWindowBlurred(false);
    }
  }, []);

  const handleWindowBlur = useCallback(() => {
    setIsWindowBlurred(true);
  }, []);

  const handleWindowFocus = useCallback(() => {
    setIsWindowBlurred(false);
  }, []);

  // ─────────────── 6. INJECT CSS & API OVERRIDES ───────────────
  useEffect(() => {
    // Block navigator.mediaDevices.getDisplayMedia (Web Screen Recording API)
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      try {
        navigator.mediaDevices.getDisplayMedia = function () {
          return Promise.reject(new Error('Screen capture is disabled for security reasons.'));
        };
      } catch (err) {
        // Ignored if read-only property in certain browsers
      }
    }

    // Inject CSS for user-select, image drag, and print protection
    const styleId = 'sg-anti-capture-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Disable text selection globally */
        body {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }

        /* Re-enable text selection in inputs, textareas, and code editors */
        input, textarea, [contenteditable="true"], .cm-editor, .cm-content, pre, code {
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          -ms-user-select: text !important;
          user-select: text !important;
        }

        /* Disable image dragging */
        img {
          -webkit-user-drag: none !important;
          user-drag: none !important;
          pointer-events: auto;
        }

        /* Hide body content on print attempt */
        @media print {
          html, body {
            display: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Attach event listeners
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    // Initial DevTools check interval
    const devToolsInterval = setInterval(checkDevTools, 2000);

    // Block drag events
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };
    document.addEventListener('dragstart', handleDragStart, true);

    // Block copy on non-editable elements
    const handleCopy = (e) => {
      const target = e.target;
      const isEditable =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest?.('.cm-editor');
      if (!isEditable) {
        e.preventDefault();
        showSecurityToast('Copying content is restricted.');
        return false;
      }
    };
    document.addEventListener('copy', handleCopy, true);

    // Trigger Fullscreen on first user gesture
    const triggerInitialFullscreen = () => {
      requestFullscreen();
      document.removeEventListener('click', triggerInitialFullscreen);
      document.removeEventListener('keydown', triggerInitialFullscreen);
    };
    document.addEventListener('click', triggerInitialFullscreen, { once: true });
    document.addEventListener('keydown', triggerInitialFullscreen, { once: true });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('copy', handleCopy, true);
      clearInterval(devToolsInterval);

      const existingStyle = document.getElementById(styleId);
      if (existingStyle) existingStyle.remove();
    };
  }, [handleContextMenu, handleKeyDown, handleFullscreenChange, handleVisibilityChange, handleWindowBlur, handleWindowFocus, checkDevTools, requestFullscreen, showSecurityToast]);

  return (
    <>
      {/* ── SECURITY TOAST NOTIFICATION ── */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[99999] bg-slate-900/95 text-amber-400 border border-amber-500/40 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md text-sm font-medium flex items-center gap-3 animate-fade-in pointer-events-none">
          <i className="ri-shield-keyhole-line text-lg text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── SCREEN RECORDING / WINDOW BLUR PRIVACY SHIELD ── */}
      {isWindowBlurred && !isDevToolsOpen && (
        <div className="fixed inset-0 z-[99990] bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center text-white select-none pointer-events-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400 text-3xl shadow-lg">
            <i className="ri-eye-off-line" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Screen Privacy Shield Active</h2>
          <p className="text-slate-400 max-w-md text-sm mb-6">
            Content is hidden while the browser window is inactive or unfocused to prevent screen recording and unauthorized capture.
          </p>
          <span className="text-xs text-amber-400/80 font-mono bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20">
            Click inside window to resume
          </span>
        </div>
      )}

      {/* ── FULLSCREEN REQUIRED OVERLAY ── */}
      {isFullscreenRequired && !isDevToolsOpen && (
        <div 
          onClick={requestFullscreen}
          className="fixed inset-0 z-[99980] bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white cursor-pointer select-none"
        >
          <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 text-indigo-400 text-4xl shadow-xl animate-pulse">
            <i className="ri-fullscreen-line" />
          </div>
          <h2 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Fullscreen Mode Required
          </h2>
          <p className="text-slate-300 max-w-lg text-sm leading-relaxed mb-8">
            Sowberry platform requires full screen mode for secure learning, assessment integrity, and seamless navigation.
          </p>
          <button
            onClick={requestFullscreen}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 text-base"
          >
            <i className="ri-fullscreen-exit-line" />
            Click Anywhere to Enter Fullscreen
          </button>
        </div>
      )}

      {/* ── DEVTOOLS RESTRICTED OVERLAY ── */}
      {isDevToolsOpen && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center text-white select-none">
          <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6 text-red-500 text-4xl shadow-2xl">
            <i className="ri-shield-cross-line" />
          </div>
          <h2 className="text-3xl font-extrabold mb-3 text-red-400">
            Developer Tools Restricted
          </h2>
          <p className="text-slate-300 max-w-lg text-sm leading-relaxed mb-8">
            Developer Tools (Inspect Element, Console) are disabled to protect course materials, tests, and intellectual property. Please close Developer Tools to continue using Sowberry.
          </p>
          <button
            onClick={() => {
              setIsDevToolsOpen(false);
              checkDevTools();
            }}
            className="px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold shadow-xl transition-all flex items-center gap-2 text-base"
          >
            <i className="ri-refresh-line" />
            Close DevTools & Continue
          </button>
        </div>
      )}
    </>
  );
};

export default SecurityGuard;

