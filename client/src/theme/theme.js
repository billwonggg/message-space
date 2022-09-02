import { createTheme } from "@mui/material";
import { indigo, grey, blue, blueGrey } from "@mui/material/colors";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: indigo[400],
    },
    secondary: {
      main: "#fff",
      navBar: "#000",
    },
    background: {
      default: "#fff",
      bgGradient: "linear-gradient(to top, rgba(252,92,125,0.9), rgba(106,130,251,0.9))",
    },
    chat: {
      left: grey[200],
      right: blue.A400,
      leftText: "#000",
      rightText: "#fff",
      background: "#f5f5f5",
    },
  },
});

export const themeDark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blueGrey[100],
    },
    secondary: {
      main: "#000",
      navBar: "#fff",
    },
    background: {
      default: grey[900],
      bgGradient: "linear-gradient(to bottom, #355c7d, #6c5b7b, #c06c84)",
    },
    chat: {
      left: grey[800],
      right: blue.A700,
      leftText: "#fff",
      rightText: "#fff",
      background: "#1a1a1a",
    },
  },
});
