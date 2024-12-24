import React from 'react';
import { AppBar, Toolbar, Grid2, TextField, Box, Avatar } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Grid2 container alignItems="center" spacing={2}>
          {/* Logo Section */}
          <Grid2 item xs={6} sm={3} md={2}>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <img
                src="/images/navbar/temp_logo.png"
                alt="Logo"
                style={{ maxHeight: '40px', width: 'auto' }}
              />
            </Box>
          </Grid2>

          {/* Search Bar Section */}
          <Grid2 item xs={12} sm={6} md={8} display={{ xs: 'none', sm: 'flex' }}>
            <TextField
              fullWidth
              placeholder="Search..."
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: '4px',
              }}
            />
          </Grid2>

          {/* Profile Section */}
          <Grid2 item xs={6} sm={3} md={2}>
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
          </Grid2>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;