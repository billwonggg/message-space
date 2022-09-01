import React from "react";
import ChatArea from "../components/ChatArea";
import ChatNavBar from "../components/ChatNavBar";

const ChatPage = (props) => {
  return (
    <div>
      <ChatNavBar {...props} />
      <ChatArea {...props} />
    </div>
  );
};

export default ChatPage;
