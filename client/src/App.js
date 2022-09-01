import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import { ThemeProvider } from "@mui/material";
import { themeLight } from "./theme/theme";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [userData, setUserData] = useState({
    username: "",
    room: undefined,
  });

  return (
    <ThemeProvider theme={themeLight}>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/register"
            element={<RegisterPage setUserData={setUserData} socket={socket} />}
          />
          <Route exact path="/chat" element={<ChatPage userData={userData} socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
