import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import { useTheme } from "./contexts/ThemeProvider";
import { TaskProvider } from "./contexts/TaskProvider";
import { ModalProvider } from "./contexts/ModalProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import RequireAuth from "./components/Routes/RequireAuth";
import ProtectedContent from "./layouts/ProtectedContent";
import Login from "./components/UserManagement/Login";
import Register from "./components/UserManagement/Register";

/**
 * App Component
 * 
 * Root component that sets up all providers and routes.
 * Handles theme context and provides all necessary context providers.  
 */
const App = () => {
  const { mode } = useTheme(); // Tracks the current theme (light/dark)

  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />
      <TaskProvider>
        <ModalProvider>
          <Router>
            <AuthProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes */}
                <Route
                  path="/*"
                  element={
                    <RequireAuth>
                      <ProtectedContent />
                    </RequireAuth>
                  }
                />
              </Routes>
            </AuthProvider>
          </Router>
        </ModalProvider>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;