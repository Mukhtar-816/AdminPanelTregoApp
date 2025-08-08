import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      setUser({ email: import.meta.env.VITE_USER_EMAIL });
    }
    setAuthLoading(false);
  };

  const login = async (email, password) => {
    setAuthLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === import.meta.env.VITE_USER_EMAIL && password === import.meta.env.VITE_USER_PASSWORD) {
          localStorage.setItem("adminToken", "admin-jwt-token");
          setIsAuthenticated(true);
          setUser({ email });
          resolve(true);
        } else {
          resolve(false);
        }
        setAuthLoading(false);
      }, 1500);
    });
  };

  const logout = () => {
    setAuthLoading(true);
    setTimeout(() => {
      localStorage.removeItem("adminToken");
      setIsAuthenticated(false);
      setUser(null);
      setAuthLoading(false);
    }, 1500);
  };

  return (
    <AuthContext.Provider
      value={{ authLoading, isAuthenticated, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
