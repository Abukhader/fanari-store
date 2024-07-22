import React, { createContext, useEffect, useState } from "react";

// إنشاء السياق
// @ts-ignore
export const AuthContext = createContext();

// مكون مزود السياق
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const checkLoginStatus = () => {
    const accessToken = getCookie("accessToken");
    setIsLoggedIn(!!accessToken);
    if (accessToken) {
      setToken(accessToken);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      document.cookie = `accessToken=${newToken}; path=/;`;
      setIsLoggedIn(true);
    } else {
      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  return (
    <AuthContext.Provider
      value={{ token, updateToken, isLoggedIn, setIsLoggedIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
