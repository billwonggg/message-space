import { useState, useContext } from "react";
import { Container, Grid, IconButton, Typography, TextField } from "@mui/material";
import { FormControl, Box, Divider } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { SelectThemeContext } from "../theme/ThemeContext";
import { sendNotif } from "../util/notificationHelper";
import ChatMessages from "./ChatMessages";
import ChatUsersList from "./ChatUsersList";

const ChatArea = ({ userData, socket, chatMessages, setChatMessages, usersList }) => {
  const [message, setMessage] = useState("");
  const [darkMode] = useContext(SelectThemeContext);

  const sendMessage = async () => {
    if (message === "") return;

    if (!socket.connected) {
      sendNotif("Error connecting to the server", "error", darkMode);
      return;
    }
    const messageData = {
      sender: userData.name,
      room: userData.room,
      message: message,
      time: new Date(Date.now()),
    };

    try {
      await socket.emit("send_message", messageData);
    } catch (err) {
      sendNotif("Server error, please try again later", "error", darkMode);
      return;
    }
    setMessage("");
    setChatMessages([...chatMessages, messageData]);
  };

  const getUsersList = () => {
    if (!socket.connected) {
      sendNotif("Error connecting to the server", "error", darkMode);
      return;
    }
    try {
      socket.emit("get_users_list", { name: userData.name, room: userData.room });
    } catch (err) {
      sendNotif("Server error, please try again later", "error", darkMode);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      sendMessage();
    }
  };

  return (
    <Container>
      <Box
        p={3}
        backgroundColor="chat.background"
        sx={{ mt: { xs: 2, md: 4 }, borderRadius: { xs: "15px", md: "25px" }, boxShadow: 12 }}
      >
        <Typography
          fontWeight={600}
          fontFamily="monospace"
          sx={{ fontSize: { xs: "24px", md: "28px" } }}
        >
          Room {userData.room}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Typography
            gutterBottom
            fontFamily="monospace"
            sx={{ fontSize: { xs: "14px", md: "18px" }, mr: "auto" }}
          >
            Signed in as {userData.name}
          </Typography>
          <ChatUsersList usersList={usersList} getUsersList={getUsersList} />
        </Box>
        <Divider />
        <Grid container spacing={2} alignItems="center">
          <Grid
            sx={{ height: { xs: "63vh", md: "60vh" }, overflowY: "auto", mt: 2, p: 1 }}
            xs={12}
            item
          >
            <ChatMessages userData={userData} chatMessages={chatMessages} />
          </Grid>
          <Grid xs={10} md={11} item>
            <FormControl fullWidth>
              <TextField
                onChange={handleMessageChange}
                onKeyDown={handleEnterKey}
                value={message}
                placeholder="Write a message..."
                variant="outlined"
                size="small"
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
    </Container>
  );
};

export default ChatArea;
