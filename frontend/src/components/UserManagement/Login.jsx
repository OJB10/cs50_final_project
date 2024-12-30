import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { TextField, Button, Typography, Grid, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth(); // Destructure login
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCredentials((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const success = await login(credentials); // Call login function from useAuth
      if (success) {
        navigate("/"); // Redirect to home page on successful login
      } else {
        setError("Invalid email or password. Please try again.");
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
            mt: 10, // Adds margin-top for spacing
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
                  value={credentials.email}
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
                  value={credentials.password}
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