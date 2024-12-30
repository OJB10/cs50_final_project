import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme"; // Your theme.js file

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // Default to 'light' or retrieve from localStorage
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const storedMode = localStorage.getItem("theme") || "light";
    setMode(storedMode);
  }, []);
  
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    // Apply mode-specific body class if needed
    document.body.className = mode === "dark" ? "dark-mode" : "light-mode";
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme(mode)}> {/* Use your custom theme */}
        <CssBaseline /> {/* Ensures consistent global styling */}
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};