import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Switch,
  Paper,
  Divider,
  FormControlLabel,
  Alert,
  Container,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  InputAdornment,
  Snackbar
} from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "../contexts/ThemeProvider";

/**
 * Profile Page Component
 * 
 * User profile page with settings to update name, password, and toggle theme preference.
 * 
 * @param {Object} props
 * @param {Object} props.user - The current user object
 * @param {Function} props.onThemeToggle - Function to toggle theme
 */
const Profile = ({ user, onThemeToggle }) => {
  const { mode } = useTheme();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    password: "",
    theme: mode || "light",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleTheme = async () => {
    const newTheme = formData.theme === "light" ? "dark" : "light";
    setFormData({ ...formData, theme: newTheme });
    onThemeToggle(newTheme);
    
    try {
      await fetch("http://127.0.0.1:5000/api/users/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ theme: newTheme }),
      });
      
      showNotification("Theme preference updated", "success");
    } catch (error) {
      console.error("Error updating theme preference:", error);
      showNotification("Failed to update theme preference", "error");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        showNotification("Profile updated successfully", "success");
        setIsEditing(false);
      } else {
        const error = await response.json();
        showNotification(`Error: ${error.error}`, "error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showNotification("Failed to update profile", "error");
    }
  };

  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ paddingTop: "80px", paddingBottom: 4 }}>
        <Grid container spacing={3}>
          {/* Profile Header Card */}
          <Grid item xs={12}>
            <Card className="card">
              <CardContent sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", padding: 3 }}>
                <Avatar 
                  src="/images/navbar/temp_profile.png" 
                  alt={user?.name || "User"}
                  sx={{ width: 100, height: 100, marginRight: { xs: 0, sm: 3 }, marginBottom: { xs: 2, sm: 0 } }}
                />
                <Box sx={{ textAlign: { xs: "center", sm: "left" }, flexGrow: 1 }}>
                  <Typography variant="h4" className="h4" gutterBottom>
                    {user?.name || "User Profile"}
                  </Typography>
                  <Typography variant="body1" className="body" color="text.secondary">
                    {user?.email || "user@example.com"}
                  </Typography>
                </Box>
                <IconButton 
                  color="primary" 
                  onClick={() => setIsEditing(!isEditing)}
                  sx={{ alignSelf: { xs: "center", sm: "flex-start" } }}
                >
                  <EditIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Settings Form */}
          <Grid item xs={12}>
            <Card className="card">
              <CardHeader 
                title="Account Settings" 
                className="h5"
                titleTypographyProps={{ variant: "h5" }}
                sx={{ 
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  paddingX: 3
                }}
              />
              <CardContent sx={{ padding: 3 }}>
                <Grid container spacing={3}>
                  {/* User Name */}
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Display Name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                      disabled={!isEditing}
                      variant="outlined"
                      InputProps={{
                        endAdornment: isEditing ? (
                          <InputAdornment position="end">
                            <EditIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ) : null
                      }}
                    />
                  </Grid>
                  
                  {/* Password - Only enabled when editing */}
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      label="New Password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                      placeholder={isEditing ? "Enter new password" : "••••••••"}
                      helperText={isEditing ? "Leave blank to keep current password" : ""}
                      variant="outlined"
                      InputProps={{
                        endAdornment: isEditing ? (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                              aria-label="toggle password visibility"
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ) : null
                      }}
                    />
                  </Grid>
                  
                  {/* Theme Preference */}
                  <Grid item xs={12}>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        padding: 2, 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {formData.theme === "dark" ? <DarkModeIcon sx={{ mr: 1 }} /> : <LightModeIcon sx={{ mr: 1 }} />}
                        <Typography variant="body1" className="body">
                          Theme Preference
                        </Typography>
                      </Box>
                      
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.theme === "dark"}
                            onChange={handleToggleTheme}
                            color="primary"
                          />
                        }
                        label={formData.theme === "dark" ? "Dark Mode" : "Light Mode"}
                        labelPlacement="start"
                      />
                    </Paper>
                  </Grid>
                  
                  {/* Save Button - Only visible when editing */}
                  {isEditing && (
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        fullWidth
                        className="btn"
                        startIcon={<SaveIcon />}
                        size="large"
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;