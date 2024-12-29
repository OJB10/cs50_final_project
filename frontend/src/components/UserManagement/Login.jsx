import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Login Component
 * A form for users to log in to the application.
 *
 * Props:
 * - onLogin (function): Callback to handle successful login, updates the global user state.
 *
 * State:
 * - formData (object): Stores user input for email and password.
 * - error (string): Stores error messages for display.
 *
 * Returns:
 * - JSX element representing the login form.
 */
const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Tracks login errors
  const navigate = useNavigate(); // Navigation after successful login

  /**
   * Handle input field changes.
   * Updates the formData state with user input.
   *
   * @param {object} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /**
   * Handle form submission.
   * Sends login data to the server and handles the response.
   *
   * @param {object} e - The form submission event.
   */
 // In Login.jsx, update the handleSubmit function:
const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors
    
    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Login response:", data); // Debug log
  
      if (response.ok && data.user) {
        onLogin(data.user);
        navigate("/");
      } else {
        setError(data.error || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email" // Enables email autocomplete
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password" // Enables password autocomplete
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ paddingY: 1.5 }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Login;