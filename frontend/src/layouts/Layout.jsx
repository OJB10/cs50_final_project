import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar/Navbar'; // Adjust the path as needed

const Layout = ({ children }) => {
  return (
    <Box>
      <CssBaseline />
      {/* Fixed Navbar */}
      <Navbar />
      {/* Main Content Area */}
      <Box sx={{ marginTop: '64px', padding: '16px' }}> {/* Adjust `marginTop` based on Navbar height */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;