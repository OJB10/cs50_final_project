import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const AsyncRoute = ({ children, onAuthSuccess }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/users/session", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setAuthUser(userData);
          if (onAuthSuccess) {
            await onAuthSuccess(userData);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    checkAuth();
  }, [onAuthSuccess]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { user: authUser })
  );
};

export default AsyncRoute;