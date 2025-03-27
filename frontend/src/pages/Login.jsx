import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  Box, 
  Alert, 
  Link, 
  Paper,
  InputAdornment,
  IconButton 
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";

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
  const [showPassword, setShowPassword] = useState(false);

  // Get the final error message from either local form validation or the auth context
  const errorMessage = formError || authError;

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    
    // Basic form validation
    if (!credentials.email || !credentials.password) {
      setFormError("Please enter both email and password");
      return;
    }
    
    // The AuthProvider handles navigation on successful login
    await login(credentials);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2,
        backgroundColor: 'background.default'
      }}
    >
      <Paper
        elevation={3}
        className="card"
        sx={{
          width: '100%',
          maxWidth: 440,
          padding: 4,
        }}
      >
        <Typography 
          variant="h4" 
          className="h4 text-center"
          color="primary"
          gutterBottom
          sx={{ marginBottom: 3 }}
        >
          Login to Dash
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ marginBottom: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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
                placeholder="Enter your email"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                disabled={loading}
                placeholder="Enter your password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className="btn"
                disabled={loading}
                sx={{ padding: '12px 0' }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center", marginTop: 2 }}>
              <Typography variant="body2" className="body-small">
                Don't have an account?{" "}
                <Link 
                  component={RouterLink} 
                  to="/register" 
                  color="primary"
                  sx={{ textDecoration: 'none', fontWeight: 'var(--font-weight-medium)' }}
                >
                  Register now
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;