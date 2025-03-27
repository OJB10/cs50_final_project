import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { TextField, Button, Typography, Grid, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Login Component
 * 
 * Handles user login with form validation and error handling.
 * Redirects to home page if already authenticated.
 */
const Login = () => {
  const { login, loading, authError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");
  const [loginAttempted, setLoginAttempted] = useState(false);

  // Get the final error message from either local form validation or the auth context
  const errorMessage = formError || authError;

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Login component: Already authenticated, redirecting to dashboard");
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setLoginAttempted(true);
    
    // Basic form validation
    if (!credentials.email || !credentials.password) {
      setFormError("Please enter both email and password");
      return;
    }
    
    console.log("Submitting login credentials");
    // The AuthProvider handles navigation on successful login
    await login(credentials);
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
        mt: 10,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
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
              value={credentials.email}
              onChange={handleChange}
              autoComplete="email"
              required
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ paddingY: 1.5 }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Login;