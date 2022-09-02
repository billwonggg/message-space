import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ChatBox from "../components/ChatBox";
import ChatNavBar from "../components/ChatNavBar";

const ChatPage = (props) => {
  const userData = props.userData;
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (!userData.name || !userData.room) {
      navigate("/");
    }
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: theme.palette.background.bgGradient,
      }}
    >
      <ChatNavBar {...props} />
      <ChatBox {...props} />
      <ToastContainer />
    </div>
  );
};

export default ChatPage;
