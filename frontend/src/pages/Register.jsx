import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid, Box, Alert, CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

/**
 * Register Component
 * 
 * Handles user registration with form validation and error handling.
 * Redirects to home page if already authenticated.
 */
const Register = () => {
  const { isAuthenticated, register, loading: authLoading, authError } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error when field is changed
    if (formSubmitted) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Validate form inputs
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      setSuccess(true);
    } else if (result.validationErrors) {
      // Set field-specific validation errors from the backend
      setFormErrors(prev => ({
        ...prev,
        ...result.validationErrors
      }));
    }
    
    setLoading(false);
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
      {authError && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {authError}
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
              disabled={loading || authLoading}
              error={!!formErrors.name}
              helperText={formErrors.name}
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
              disabled={loading || authLoading}
              error={!!formErrors.email}
              helperText={formErrors.email}
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
              disabled={loading || authLoading}
              error={!!formErrors.password}
              helperText={formErrors.password}
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
              disabled={loading || authLoading}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ paddingY: 1.5 }}
              disabled={loading || authLoading}
              startIcon={loading || authLoading ? <CircularProgress size={24} color="inherit" /> : null}
            >
              {loading || authLoading ? "Registering..." : "Register"}
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