import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode, // Automatically switches between 'light' and 'dark'
    // Primary Color - Illuminate
    primary: {
      main: '#BA4FFF', // Core primary magenta
      light: '#FF7FFF', // Bright magenta
      dark: '#7F1FCC', // Deep magenta
    },
    // Secondary Color - Dragon
    secondary: {
        main: '#FF41F2', // Core secondary pink
        light: '#FF71FF', // Vibrant pink, lighter tone
        dark: '#CC00EF', // Deep pink
    },
    // Tertiary Color - Tangerine
    tertiary: {
      main: '#FF504A', // Core tertiary orange
      light: '#FF7F7D', // Warm orange
      dark: '#CC3017', // Deep orange
    },
    // System Colors
    info: {
        main: '#5F5FEF', // Calming blue (iris)
      },
      success: {
        main: '#40C093', // Soft green (evergreen)
      },
      warning: {
        main: '#FFB82B', // Bright yellow (caution)
      },
      error: {
        main: '#FF4242', // Strong red (strawberry)
      },
      // Neutral Colors
      background: {
        default: mode === 'light' ? '#F5F5F5' : '#202641', // Neutral-50 (light) or Neutral-900 (dark)
        paper: mode === 'light' ? '#FFFFFF' : '#2A2A3C', // White (light) or darker grey (dark)
      },
      text: {
        primary: mode === 'light' ? '#202641' : '#F5F5F5', // Neutral-900 (light) or Neutral-50 (dark)
        secondary: mode === 'light' ? '#5C5C77' : '#B4B4C7', // Neutral-700 (light) or Neutral-500 (dark)
        disabled: mode === 'light' ? '#B4B4C7' : '#5C5C77', // Neutral-500 (light) or Neutral-700 (dark)
      },
      divider: mode === 'light' ? '#E5E5E5' : '#5C5C77', // Neutral-200 (light) or Neutral-700 (dark)
    },
    typography: {
        fontFamily: "'Inter', sans-serif", // Default font family
        h1: {
          fontFamily: "'Spectral', serif", // Brand font for h1
        },
        h2: {
          fontFamily: "'Spectral', serif", // Brand font for h2
        },
        h3: {
          fontFamily: "'Spectral', serif", // Brand font for h3
        },
        h4: {
          fontFamily: "'Spectral', serif", // Brand font for h4
        },
        body1: {
          fontFamily: "'Inter', sans-serif", // Default body font
        },
        body2: {
          fontFamily: "'Inter', sans-serif", // Default secondary body font
        },
        caption: {
          fontFamily: "'Inter', sans-serif", // Default small text font
        },
        textAccent: {
          fontFamily: "'Pacifico', cursive", // Brand accent font
        },
      },
      spacing: 8, // Align with Material-UI's 8-point grid system
    });
    
    const theme = (mode) => responsiveFontSizes(createTheme(getDesignTokens(mode)));
    
    export default theme;