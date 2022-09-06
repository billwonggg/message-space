import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import { SelectThemeProvider } from "./theme/ThemeContext";
import { ToastContainer } from "react-toastify";
import { API_URL } from "./constants/apiRoutes";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

const socket = io.connect(API_URL);

const App = () => {
  const [userData, setUserData] = useState({
    username: "",
    room: undefined,
  });

  socket.on("connect", () => {
    if (userData.username && userData.room) socket.emit("client-reconnect");
  });

  return (
    <SelectThemeProvider>
      <ToastContainer />
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
