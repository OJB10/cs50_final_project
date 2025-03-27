import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Box, Alert } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

/**
 * Register Component
 * 
 * Handles user registration with form validation and error handling.
 * Redirects to home page if already authenticated.
 */
const Register = () => {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // If already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If registration was successful, show success message and login link
  if (success) {
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
          textAlign: "center"
        }}
      >
        <Typography variant="h5" gutterBottom>
          Registration Successful!
        </Typography>
        <Typography paragraph>
          Your account has been created. You can now login.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/login"
          sx={{ mt: 2 }}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred during registration");
    } finally {
      setLoading(false);
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
        mt: 10
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Register
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
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
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
              {loading ? "Registering..." : "Register"}
            </Button>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <Button variant="text" href="/login" sx={{ p: 0, minWidth: 'auto' }}>
                Login
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Register;