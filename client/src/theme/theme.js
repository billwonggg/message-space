import { createTheme } from "@mui/material";
import { red, deepPurple, indigo, grey, blue } from "@mui/material/colors";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: indigo[300],
      leftChat: grey[200],
      rightChat: blue.A400,
      leftChatText: "#000",
      rightChatText: "#fff",
    },
    secondary: {
      main: "#fff",
      navBar: "#000",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
      bgGradient: "linear-gradient(to top, rgba(252,92,125,0.9), rgba(106,130,251,0.9))",
    },
  },
});

// new dark mode
export const themeDark = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#006e56",
      leftChat: grey[200],
      rightChat: blue.A400,
      leftChatText: "#000",
      rightChatText: "#fff",
    },
    secondary: {
      main: grey[900],
      navBar: "#fff",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: grey[800],
      bgGradient: "linear-gradient(to bottom, #355c7d, #6c5b7b, #c06c84)",
    },
  },
});
