import { useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import ChatNavBar from "../components/ChatNavBar";
import { SelectThemeContext } from "../theme/ThemeContext";
import { sendNotif } from "../util/notificationHelper";
import "./ChatPage.css";

const ChatPage = ({ userData, socket }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [darkMode] = useContext(SelectThemeContext);

  const [chatMessages, setChatMessages] = useState([]);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (!userData.name || !userData.room) {
      navigate("/");
    }
  });

  useEffect(() => {
    socket.on("disconnect", () => {
      navigate("/");
    });
    return () => socket.off("disconnect");
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
      sendNotif(data.msg, data.type, darkMode);
    };
    socket.on("receive_admin_message", handler);
    return () => socket.off("receive_admin_message");
  });

  useEffect(() => {
    const handler = (data) => setUsersList(data);
    socket.on("receive_users_list", handler);
    return () => socket.off("receive_users_list");
  });

  return (
    <div
      className="chat-container"
      style={{ backgroundImage: theme.palette.background.bgGradient }}
    >
      <ChatNavBar userData={userData} socket={socket} />
      <ChatBox
        userData={userData}
        socket={socket}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        usersList={usersList}
      />
    </div>
  );
};

export default ChatPage;
