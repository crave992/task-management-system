import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  // Define your custom palette
  palette: {
    primary: {
      main: '#1976d2', // Primary color
    },
    secondary: {
      main: '#f50057', // Secondary color
    },
  },
  // Customize typography
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '30px', // Adjust font size for h1
    },
  },
  // Customize spacing
  spacing: 8, // Base spacing unit (default is 8px)
  // Customize breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
