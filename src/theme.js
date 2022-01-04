const themeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#292929',
    },
    secondary: {
      main: '#d84315',
    },
    error: {
      main: '#ff1100',
    },
    warning: {
      main: '#ff9800',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiTooltip: {
      arrow: true,
    },
  },
};

export default themeOptions;