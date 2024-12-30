import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#BA4FFF",
      light: "#FF7FFF",
      dark: "#7F1FCC",
    },
    secondary: {
      main: "#FF41F2",
      light: "#FF71FF",
      dark: "#CC00EF",
    },
    tertiary: {
      main: "#FF504A",
      light: "#FF7F7D",
      dark: "#CC3017",
    },
    info: {
      main: "#5F5FEF",
    },
    success: {
      main: "#40C093",
    },
    warning: {
      main: "#FFB82B",
    },
    error: {
      main: "#FF4242",
    },
    background: {
      default: mode === "light" ? "#F5F5F5" : "#202641",
      paper: mode === "light" ? "#FFFFFF" : "#2A2A3C",
    },
    text: {
      primary: mode === "light" ? "#202641" : "#F5F5F5",
      secondary: mode === "light" ? "#5C5C77" : "#B4B4C7",
      disabled: mode === "light" ? "#B4B4C7" : "#5C5C77",
    },
    divider: mode === "light" ? "#E5E5E5" : "#5C5C77",
    action: {
      active: mode === "light" ? "#5C5C77" : "#B4B4C7",
      hover: mode === "light" ? "#E5E5E5" : "#3A3A4D",
      selected: mode === "light" ? "#E5E5E5" : "#3A3A4D",
      disabled: mode === "light" ? "#B4B4C7" : "#5C5C77",
      disabledBackground: mode === "light" ? "#F0F0F0" : "#2E2E3E",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontFamily: "'Spectral', serif",
    },
    h2: {
      fontFamily: "'Spectral', serif",
    },
    h3: {
      fontFamily: "'Spectral', serif",
    },
    h4: {
      fontFamily: "'Spectral', serif",
    },
    body1: {
      fontFamily: "'Inter', sans-serif",
    },
    body2: {
      fontFamily: "'Inter', sans-serif",
    },
    caption: {
      fontFamily: "'Inter', sans-serif",
    },
    textAccent: {
      fontFamily: "'Pacifico', cursive",
    },
  },
  spacing: 8,
});

const theme = (mode) => responsiveFontSizes(createTheme(getDesignTokens(mode)));

export default theme;