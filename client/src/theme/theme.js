import { createTheme } from "@mui/material";
import { red, deepPurple, indigo, grey, blue } from "@mui/material/colors";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: indigo[300],
      leftChat: grey[200],
      rightChat: blue.A400,
      leftChatText: "black",
      rightChatText: "#fff",
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
