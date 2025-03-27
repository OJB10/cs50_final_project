import React from 'react';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';

/**
 * LoadingState Component
 * 
 * A reusable component to display a loading indicator with an optional message.
 * Used when fetching data or during asynchronous operations.
 * 
 * @param {Object} props
 * @param {string} [props.message="Loading..."] - The message to display
 * @param {boolean} [props.fullHeight=true] - Whether to use full viewport height
 * @param {string} [props.size="medium"] - Size of the loading indicator ("small", "medium", "large")
 * @returns {JSX.Element} The loading state component
 */
const LoadingState = ({ 
  message = "Loading...", 
  fullHeight = true, 
  size = "medium" 
}) => {
  // Map size text to pixel values
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 56
  };

  const circleSize = sizeMap[size] || sizeMap.medium;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight={fullHeight ? "calc(100vh - 64px)" : "200px"}
      padding={3}
    >
      <Paper 
        elevation={0}
        sx={{
          padding: 4, 
          borderRadius: 'var(--border-radius-medium)', 
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <CircularProgress 
          size={circleSize} 
          color="primary" 
          sx={{ marginBottom: 2 }} 
        />
        <Typography 
          variant="h6" 
          className="body-large" 
          color="text.secondary" 
          textAlign="center"
        >
          {message}
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoadingState;