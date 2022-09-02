import { useEffect, useState, useRef } from "react";
import { Container, Grid, Paper, IconButton, Typography, TextField } from "@mui/material";
import { FormControl, Box, Divider } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const ChatArea = ({ userData, socket }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const sendMessage = async () => {
    if (message === "") return;
    const messageData = {
      sender: userData.name,
      room: userData.room,
      message: message,
      time: new Date(Date.now()),
    };

    try {
      await socket.emit("send_message", messageData);
    } catch (err) {
      console.log(err);
      return;
    }
    setMessage("");
    setChatMessages([...chatMessages, messageData]);
  };

  useEffect(() => {
    const handler = (data) => {
      setChatMessages((messages) => [...messages, data]);
    };
    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  });

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      sendMessage();
    }
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
              <Typography sx={{ pl: 1, fontSize: "14px" }}>{msg.sender}</Typography>
            )}
            <Typography
              color={`primary.${messagePos}ChatText`}
              sx={{
                p: 1,
                pl: 2,
                pr: 2,
                m: "3px",
                borderRadius: { xs: "17px", md: "20px" },
                backgroundColor: `primary.${messagePos}Chat`,
                display: "inline-block",
                fontSize: "18px",
                maxWidth: { xs: "65vw", md: "45vw" },
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
    <Container>
      <Paper elevation={6} sx={{ mt: 4, borderRadius: { xs: "15px", md: "25px" } }}>
        <Box p={3}>
          <Typography variant="h4" fontWeight={600} fontFamily="monospace">
            Room {userData.room}
          </Typography>
          <Typography variant="h6" gutterBottom fontFamily="monospace">
            Signed in as {userData.name}
          </Typography>
          <Divider />
          <Grid container spacing={2} alignItems="center">
            <Grid sx={{ height: "65vh", overflowY: "auto", mt: 2 }} xs={12} item>
              {getMessages()}
            </Grid>
            <Grid xs={10} md={11} item>
              <FormControl fullWidth>
                <TextField
                  onChange={handleMessageChange}
                  onKeyDown={handleEnterKey}
                  value={message}
                  placeholder="Write a message..."
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid xs={1} md={1} item>
              <IconButton onClick={sendMessage} aria-label="send" color="primary">
                <SendRoundedIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatArea;
