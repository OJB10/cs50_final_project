import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  TextField,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useTheme } from "../../contexts/ThemeProvider";

/**
 * Navbar Component
 *
 * The navigation bar at the top of the page. Includes a logo, search bar, and user profile section.
 *
 * @param {Object} props
 * @param {Function} [props.onLogout] - Optional callback for logout
 * @returns {JSX.Element} The Navbar component
 */
const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toggleTheme } = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  // Open dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Navigate to Profile Page
  const handleProfileClick = () => {
    navigate("/profile");
    handleMenuClose();
  };

  // Handle logout
  const handleLogout = async () => {
    handleMenuClose();
    
    // Use provided logout callback if available, otherwise use the default logout
    if (onLogout) {
      onLogout();
    } else {
      logout();
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "primary.main",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Grid container alignItems="center" spacing={2}>
          {/* Logo Section */}
          <Grid item xs={6} sm={3} md={2}>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Link href="/" style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/images/navbar/temp_logo.png"
                  alt="Logo"
                  style={{ maxHeight: "40px", width: "auto" }}
                />
              </Link>
            </Box>
          </Grid>

          {/* Search Bar Section */}
          <Grid item xs={12} sm={6} md={8} display={{ xs: "none", sm: "flex" }}>
            <TextField
              fullWidth
              placeholder="Search..."
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "4px",
              }}
            />
          </Grid>

          {/* Profile Section */}
          <Grid item xs={6} sm={3} md={2}>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <IconButton
                onMouseEnter={(event) => {
                  if (window.innerWidth >= 1024) {
                    handleMenuOpen(event);
                  }
                }} // Hover for desktop
                onClick={(event) => {
                  if (window.innerWidth < 1024) {
                    handleMenuOpen(event);
                  }
                }} // Click for mobile
                size="small"
                sx={{ ml: 2 }}
              >
                <Avatar
                  src="/images/navbar/temp_profile.png"
                  alt="Profile"
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                  onMouseLeave: handleMenuClose,
                }}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={toggleTheme}>Toggle Theme</MenuItem> {/* Optional */}
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;