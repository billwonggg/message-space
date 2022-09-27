import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import io from "socket.io-client";
import { API_URL } from "./constants/apiRoutes";
import ChatPage from "./pages/ChatPage";
import RegisterPage from "./pages/RegisterPage";
import { SelectThemeProvider } from "./theme/ThemeContext";

const socket = io(API_URL);

const App = () => {
  const [userData, setUserData] = useState({
    username: "",
    room: undefined,
  });

  const appHeight = () => {
    document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  useEffect(() => appHeight());
  useEffect(() => {
    window.addEventListener("resize", appHeight);
    return () => window.removeEventListener("resize", appHeight);
  }, []);

  return (
    <SelectThemeProvider>
      <ToastContainer transition={Slide} />
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
