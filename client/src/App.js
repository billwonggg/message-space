import react from "react";
import { Router, Route, Switch } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import { ThemeProvider } from "@mui/material";
import { themeLight } from "./theme/theme";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={themeLight}>
      <ChatPage />
      {/* <RegisterPage /> */}
    </ThemeProvider>
  );
};

export default App;
