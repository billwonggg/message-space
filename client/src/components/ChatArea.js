import { useEffect, useState, useRef } from "react";
import { Container, Grid, Paper, IconButton, Typography, TextField } from "@mui/material";
import { FormControl, Box, Divider, List, ListItem, ListItemText } from "@mui/material";
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
    socket.on("receive_message", (data) => {
      setChatMessages((messages) => [...messages, data]);
    });
  }, [socket]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      sendMessage();
    }
  };

  const getMessages = () => {
    return chatMessages.map((msg, i) => (
      <ListItem key={i}>
        <ListItemText>{`${msg.sender}: ${msg.message}`}</ListItemText>
      </ListItem>
    ));
  };

  return (
    <Container>
      <Paper elevation={6} sx={{ mt: 4 }}>
        <Box p={3}>
          <Typography variant="h4" fontWeight={600} fontFamily="monospace">
            Room {userData.room}
          </Typography>
          <Typography variant="h6" gutterBottom fontFamily="monospace">
            Signed in as {userData.name}
          </Typography>
          <Divider />
          <Grid container spacing={2} alignItems="center">
            <Grid sx={{ height: "65vh" }} xs={12} item>
              <List sx={{ overflow: "auto" }}>{getMessages()}</List>
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
