import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatArea from "../components/ChatArea";
import ChatNavBar from "../components/ChatNavBar";

const ChatPage = (props) => {
  const userData = props.userData;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.name || !userData.room) {
      navigate("/");
    }
  });

  return (
    <div>
      <ChatNavBar {...props} />
      <ChatArea {...props} />
    </div>
  );
};

export default ChatPage;
