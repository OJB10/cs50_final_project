import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { TaskProvider } from "./contexts/TaskProvider";
import { ModalProvider } from "./contexts/ModalProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import RequireAuth from "./components/Routes/RequireAuth";
import ProtectedContent from "./layouts/ProtectedContent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

/**
 * App Component
 * 
 * Root component that sets up all providers and routes.
 * Integrates all context providers and routing structure.
 */
const App = () => {
  return (
    <ThemeProvider>
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