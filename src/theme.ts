import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: "#ffcc2f",
    },
    secondary: {
      main: "#543729",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        color: "#008ec4",
        underline: "none",
      },
    },
  },
});

export default theme;
