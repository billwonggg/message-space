import { useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const ChatMessages = ({ userData, chatMessages }) => {
  const lastMessage = useRef(null);

  useEffect(() => {
    lastMessage?.current?.scrollIntoView({ behavior: "smooth" });
  });

  const getMessages = () => {
    let currOther = "";
    return chatMessages.map((msg, i) => {
      const messagePos = msg.sender === userData.name ? "right" : "left";
      const displayOtherName = msg.sender !== userData.name && msg.sender !== currOther;
      currOther = msg.sender;
      return (
        <Box key={i} sx={{ width: "100%", display: "flex", justifyContent: messagePos }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {displayOtherName && (
              <Typography sx={{ pl: 1, fontSize: { xs: "13px", md: "14px" } }}>
                {msg.sender}
              </Typography>
            )}
            <Typography
              color={`chat.${messagePos}Text`}
              sx={{
                p: 1,
                pl: 2,
                pr: 2,
                m: "3px",
                borderRadius: { xs: "17px", md: "20px" },
                backgroundColor: `chat.${messagePos}`,
                display: "inline-block",
                fontSize: { xs: "16px", md: "18px" },
                maxWidth: { xs: "250px", md: "750px" },
              }}
            >
              {msg.message}
            </Typography>
          </Box>
        </Box>
      );
    });
  };

  return (
    <>
      {getMessages()}
      <div ref={lastMessage}></div>
    </>
  );
};

export default ChatMessages;
