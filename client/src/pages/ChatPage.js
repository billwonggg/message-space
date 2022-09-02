import React, { useEffect } from "react";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChatArea from "../components/ChatArea";
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
      <ChatArea {...props} />
    </div>
  );
};

export default ChatPage;
