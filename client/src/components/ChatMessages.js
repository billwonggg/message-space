import { useRef, useEffect } from "react";
import { Box, Typography, Avatar } from "@mui/material";

const ChatMessages = ({ userData, chatMessages }) => {
  const lastMessage = useRef(null);

  useEffect(() => {
    lastMessage?.current?.scrollIntoView({ behavior: "smooth" });
  });

  const stringToColor = (string) => {
    let hash = 0;
    /* eslint-disable no-bitwise */
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  };

  const stringAvatar = (name) => {
    const subStr = name.split(" ");
    const avatarName = subStr.length === 1 ? subStr[0][0] : `${subStr[0][0]}${subStr[1][0]}`;
    return {
      sx: {
        display: "relative",
        left: { xs: -12, md: -15 },
        width: { xs: 32, md: 40 },
        height: { xs: 32, md: 40 },
        bgcolor: stringToColor(name),
        fontSize: { xs: 16, md: 20 },
      },
      children: avatarName,
    };
  };

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
              <Typography sx={{ pl: { xs: 5, md: 7 }, fontSize: { xs: "13px", md: "14px" } }}>
                {msg.sender}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                pl: displayOtherName ? { xs: 0, md: 1 } : { xs: 4, md: 6 },
              }}
            >
              {displayOtherName && <Avatar {...stringAvatar(msg.sender)} />}

              <Typography
                color={`chat.${messagePos}Text`}
                sx={{
                  p: 1,
                  pl: 2,
                  pr: 2,
                  mt: "3px",
                  mb: "3px",
                  borderTopLeftRadius: { xs: "17px", md: "20px" },
                  borderTopRightRadius: messagePos === "right" ? "0px" : { xs: "17px", md: "20px" },
                  borderBottomLeftRadius:
                    messagePos === "left" ? "0px" : { xs: "17px", md: "20px" },
                  borderBottomRightRadius: { xs: "17px", md: "20px" },

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
