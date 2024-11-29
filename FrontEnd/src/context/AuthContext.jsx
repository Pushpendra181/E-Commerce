// AuthContext.js

import React, { createContext, useEffect, useState } from "react";
import Login from "../components/login/Login";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = parseJwt(token);
        if (userData && !isTokenExpired(userData)) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("Error parsing token:", error);
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  }, []);

  const logIn = (token) => {
    localStorage.setItem("token", token);
    const userData = parseJwt(token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.log("Failed to parse token:", error);
      return null;
    }
  };

  const isTokenExpired = (userData) => {
    if (!userData || !userData.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return userData.exp < currentTime;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logIn, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
