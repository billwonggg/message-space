import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import ChatBox from "../components/ChatBox";
import ChatNavBar from "../components/ChatNavBar";

const ChatPage = (props) => {
  const userData = props.userData;
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (!userData.name || !userData.room || !props.socket.connected) {
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
    </div>
  );
};

export default ChatPage;
