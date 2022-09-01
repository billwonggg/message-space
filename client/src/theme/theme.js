import { createTheme } from "@mui/material";
import { red, deepPurple, indigo } from "@mui/material/colors";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: indigo[300],
    },
    secondary: {
      main: deepPurple[200],
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
