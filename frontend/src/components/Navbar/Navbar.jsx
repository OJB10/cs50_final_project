import React from "react";
import { AppBar, Toolbar, Grid, TextField, Box, Avatar } from "@mui/material";

/**
 * Navbar Component
 * 
 * This component represents the navigation bar at the top of the page.
 * It includes a logo, a search bar, and a profile avatar.
 * The navigation bar is fixed to the top of the viewport.
 * 
 * @returns {JSX.Element} The Navbar component.
 */
const Navbar = () => {
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
              <Avatar
                src="/images/navbar/temp_profile.png"
                alt="Profile"
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;