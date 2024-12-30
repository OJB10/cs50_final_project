/**
 * Layout.jsx
 * 
 * This file defines the `Layout` component, which acts as a wrapper for the application.
 * It includes a fixed Navbar and renders children components in the main content area.
 */

import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar/Navbar'; // Adjust the path as needed

/**
 * Layout Component
 * 
 * The `Layout` component serves as a wrapper for the application's pages. It includes a 
 * fixed Navbar and a main content area where child components are rendered.
 * 
 * Props:
 * - children: ReactNode - The child components to be rendered in the main content area.
 * 
 * Returns:
 * - JSX.Element - The rendered Layout component.
 */
const Layout = ({ children }) => {
  return (
    <Box>
      {/* CssBaseline resets default browser styling for consistent rendering */}
      <CssBaseline />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <Box sx={{ marginTop: '64px', padding: '16px' }}> 
        {/* Adjust `marginTop` to accommodate the Navbar height */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;