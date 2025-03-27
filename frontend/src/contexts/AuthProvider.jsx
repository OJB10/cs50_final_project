import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useTasks from "../hooks/useTasks";

const AuthContext = createContext();
const LOCAL_STORAGE_KEY = 'dash_user';
const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchTasks } = useTasks();

  // Save user to localStorage and state
  const persistUser = useCallback((userData) => {
    if (userData?.id && userData?.name && userData?.email) {
      console.log("Setting user data:", userData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  }, []);

  // Clear user from localStorage and state
  const clearUser = useCallback(() => {
    console.log("Clearing user data");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUser(null);
  }, []);

  // Validate session with the server
  const validateSession = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Validating session with server");
      const response = await fetch(`${API_BASE_URL}/users/session`, {
        credentials: "include",
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("Session validation response:", data);
          if (data?.id && data?.name && data?.email) {
            persistUser(data);
            return true;
          } else {
            clearUser();
          }
        } else {
          clearUser();
        }
      } else {
        clearUser();
      }
      return false;
    } catch (error) {
      console.error("Error during session validation:", error);
      clearUser();
      return false;
    } finally {
      setLoading(false);
    }
  }, [persistUser, clearUser]);

  // Login user
  const login = async (credentials) => {
    try {
      setLoading(true);
      setAuthError(null);
      console.log("Attempting login...");
      
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        // Extract user data from response
        const userData = data.user || data;
        
        if (!userData || !userData.id) {
          console.error("Invalid user data in response:", userData);
          setAuthError("Invalid server response");
          return false;
        }

        // Set user data first
        persistUser(userData);
        
        // Navigate after successful login
        const from = location.state?.from?.pathname || "/";
        console.log("Login successful, navigating to:", from);
        
        // Use a small delay to ensure React state updates 
        // have propagated before navigation
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 50);
        
        return true;
      } else {
        const errorMessage = data.error || "Invalid email or password";
        console.error("Login failed:", errorMessage);
        setAuthError(errorMessage);
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      setAuthError("An error occurred during login");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      console.log("Logging out...");
      
      await fetch(`${API_BASE_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      
      clearUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error);
      clearUser();
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  // Initialize auth state on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      console.log("Initializing auth state...");
      // Try to get user from localStorage first
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("Found stored user:", parsedUser);
          setUser(parsedUser);
        } catch (error) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }
      
      // Always validate with the server to ensure session is still valid
      await validateSession();
    };

    initializeAuth();
  }, [validateSession]);

  // Fetch tasks once when user is authenticated
  useEffect(() => {
    if (user?.id) {
      console.log("User authenticated, initial tasks fetch");
      fetchTasks();
    }
  }, [user?.id, fetchTasks]);

  // Computed property for authentication status
  const isAuthenticated = !!user && !!user.id;

  // Monitor authentication state changes
  useEffect(() => {
    console.log("Auth state changed:", { isAuthenticated, userId: user?.id });
  }, [isAuthenticated, user]);

  const value = {
    user,
    loading,
    authError,
    login,
    logout,
    isAuthenticated,
    validateSession
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);