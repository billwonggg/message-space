import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import ChatBox from "../components/ChatBox";
import ChatNavBar from "../components/ChatNavBar";
import { SelectThemeContext } from "../theme/ThemeContext";
import { sendNotification } from "../util/notificationHelper";

const ChatPage = ({ userData, socket }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [darkMode] = useContext(SelectThemeContext);

  const [chatMessages, setChatMessages] = useState([]);
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    if (!userData.name || !userData.room || !socket.connected) {
      navigate("/");
    }
  });

  useEffect(() => {
    const handler = (data) => {
      setChatMessages((messages) => [...messages, data]);
    };
    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  });

  useEffect(() => {
    const handler = (data) => {
      sendNotification(data.msg, data.type, darkMode);
    };
    socket.on("receive_admin_message", handler);
    return () => socket.off("receive_admin_message");
  });

  useEffect(() => {
    const handler = (data) => setListUsers(data);
    socket.on("receive_users_list", handler);
    return () => socket.off("receive_users_list");
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: theme.palette.background.bgGradient,
      }}
    >
      <ChatNavBar userData={userData} socket={socket} />
      <ChatBox
        userData={userData}
        socket={socket}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};

export default ChatPage;
