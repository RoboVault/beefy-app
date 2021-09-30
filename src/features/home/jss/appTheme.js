import { createMuiTheme } from '@material-ui/core/styles';

const createTheme = isNightMode =>
  createMuiTheme({
    palette: {
      type: isNightMode ? 'dark' : 'light',
      background: {
        default: isNightMode ? '#2042b3' : '#fff',
        paper: isNightMode ? '#445db3' : '#fff',
        primary: isNightMode ? '#445db3' : '#fff',
        secondary: isNightMode ? '#445db3' : '#fff',
        extra: isNightMode ? '#242332' : '#FBF6F0',
        dark: isNightMode ? '#2B2A3D' : '#999',
        paused: isNightMode ? '#2B2A5A' : '#FCE57E',
        retired: isNightMode ? '#d32f2f' : '#e57373',
        hover: isNightMode ? '#2B2A3D' : '#EFE6DC',
        border: isNightMode ? '#2B2A3D' : '#b8c2e6',
        announce: isNightMode ? '#2B2A3D' : '#2B2A3D',
      },
      primary: {
        main: isNightMode ? '#fff' : '#000',
      },
      secondary: {
        main: isNightMode ? '#fff' : '#F8F2EC',
      },
      text: {
        primary: isNightMode ? '#fff' : '#2042b3',
        secondary: isNightMode ? '#B0B0DD' : '#445db3',
        announce: isNightMode ? '#fff' : '#fff',
      },
    },
    overrides: {
      MuiButton: {
        label: {
          color: isNightMode ? '#fff' : '#000',
        },
      },
      // for dropdown menu items
      MuiButtonBase: {
        root: {
          color: isNightMode ? '#445db3' : '#000',
        },
      },
      MuiCheckbox: {
        colorPrimary: {
          color: isNightMode ? '#fff' : '#000',
        },
        colorSecondary: {
          color: isNightMode ? '#fff' : '#000',
        },
      },
    },
  });

export default createTheme;
