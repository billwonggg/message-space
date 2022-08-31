import { createTheme } from "@mui/material";
import { red, blue } from "@mui/material/colors";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: "#5970D7",
    },
    secondary: {
      main: blue.A200,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

// new dark mode
export const themeDark = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#006e56",
    },
    secondary: {
      main: "#fafafa",
    },
  },
});
