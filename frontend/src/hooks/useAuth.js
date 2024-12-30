import { useState, useEffect } from "react";
import useTasks from "./useTasks";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchTasks } = useTasks();

  const validateSession = async () => {
    try {
      console.log("Starting session validation...");
      const response = await fetch("http://127.0.0.1:5000/api/users/session", {
        credentials: "include",
      });

      if (response.ok) {
        console.log("Session validation response OK");
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          if (data?.id && data?.name && data?.email) {
            console.log("User data found in session validation:", data);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
          } else {
            console.warn("No valid user data in session response.");
            setUser(null);
            localStorage.removeItem("user");
          }
        } else {
          console.warn("Session validation response did not return JSON.");
          setUser(null);
          localStorage.removeItem("user");
        }
      } else {
        console.warn("Session validation failed with status:", response.status);
        setUser(null);
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error during session validation:", error);
      setUser(null);
    } finally {
      setLoading(false);
      console.log("Session validation complete. User state:", user);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.id && data?.name && data?.email) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
          await fetchTasks();
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch("http://127.0.0.1:5000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("Restored user from localStorage:", parsedUser);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("user");
      }
    }
    validateSession();
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User found, fetching tasks...");
      fetchTasks();
    }
  }, [user]);

  return { user, loading, login, logout, setUser };
};

export default useAuth;