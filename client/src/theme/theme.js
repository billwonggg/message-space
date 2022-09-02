import { createTheme } from "@mui/material";
import { indigo, grey, blue } from "@mui/material/colors";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: indigo.A200,
    },
    secondary: {
      main: "#eee",
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
      background: "#fff",
    },
    register: {
      background: "#fff",
    },
  },
});

export const themeDark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: indigo.A400,
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
      background: "#1c1c1c",
    },
    register: {
      background: "#1f1f1f",
    },
  },
});
