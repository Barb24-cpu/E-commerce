import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  getSavedUser,
  saveUser,
  removeUser,
  loginUser,
  registerUser,
} from "./authStorage";

const API_LOGIN = "http://localhost:5176/api/login";
const API_REGISTER = "http://localhost:5176/api/register";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = getSavedUser();
    if (saved) setUser(saved);
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    // Try backend API first
    try {
      const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        const authUser = { name: data.name || data.email, email: data.email };
        setUser(authUser);
        saveUser(authUser);
        return { success: true };
      }
      const errData = await res.json().catch(() => null);
      return {
        success: false,
        error: errData?.message || "Invalid credentials.",
      };
    } catch {
      // Backend not available — fallback to localStorage demo auth
      const result = loginUser({ email, password });
      if (result.success) {
        setUser(result.user);
        saveUser(result.user);
      }
      return result;
    }
  };

  const register = async ({ name, email, password }) => {
    // Try backend API first
    try {
      const res = await fetch(API_REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        const authUser = { name: data.name || name, email: data.email || email };
        setUser(authUser);
        saveUser(authUser);
        return { success: true };
      }
      const errData = await res.json().catch(() => null);
      return {
        success: false,
        error: errData?.message || "Registration failed.",
      };
    } catch {
      // Backend not available — fallback to localStorage demo auth
      const result = registerUser({ name, email, password });
      if (result.success) {
        setUser(result.user);
        saveUser(result.user);
      }
      return result;
    }
  };

  const logout = () => {
    setUser(null);
    removeUser();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
