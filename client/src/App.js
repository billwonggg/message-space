import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import { SelectThemeProvider } from "./theme/ThemeContext";
import "./App.css";

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [userData, setUserData] = useState({
    username: "",
    room: undefined,
  });

  return (
    <SelectThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<RegisterPage setUserData={setUserData} socket={socket} />}
          />
          <Route exact path="/chat" element={<ChatPage userData={userData} socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </SelectThemeProvider>
  );
};

export default App;
