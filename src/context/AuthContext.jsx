import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, getToken, getUser, setToken, setUser, removeToken, removeUser } from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = getToken();
      if (token) {
        const res = await authApi.getMe();
        if (res.success) {
          setUserState(res.user);
          setUser(res.user);
        } else {
          removeToken();
          removeUser();
          setUserState(null);
        }
      }
      setLoading(false);
    };
    verifyToken();
  }, []);

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    setUserState(userData);
  };

  const logout = () => {
    removeToken();
    removeUser();
    setUserState(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
    setUserState(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
