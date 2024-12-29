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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Navbar Component
 *
 * This component represents the navigation bar at the top of the page.
 * It includes a logo, a search bar, and a profile section with a dropdown menu.
 *
 * @returns {JSX.Element} The Navbar component.
 */
const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
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

  // Logout handler
  const handleLogoutClick = () => {
    console.log("onLogout prop:", onLogout); // Debugging
    if (onLogout) {
      onLogout(); // Call the logout function
    } else {
      console.error("onLogout prop is undefined");
    }
    handleMenuClose();
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
              <img
                src="/images/navbar/temp_logo.png"
                alt="Logo"
                style={{ maxHeight: "40px", width: "auto" }}
              />
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
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;