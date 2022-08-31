import { useEffect, useState, useRef } from "react";
import { Container, Grid, Paper, IconButton, Typography, TextField } from "@mui/material";
import { FormControl, Box, Divider, List, ListItem } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const ChatArea = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const sendMessage = () => {
    if (message !== "") {
      console.log("Send!");
      // handle send
      setMessage("");
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

  const getMessages = () => {
    return chatMessages.map((message, i) => <ListItem key={i}>{message}</ListItem>);
  };

  return (
    <Container>
      <Paper elevation={6} sx={{ mt: 4 }}>
        <Box p={3}>
          <Typography variant="h4" gutterBottom fontFamily="monospace" fontWeight={600}>
            Room 5
          </Typography>
          <Divider />
          <Grid container spacing={2} alignItems="center">
            <Grid sx={{ height: "65vh" }} xs={12} item>
              <List sx={{ overflow: "auto" }}>{getMessages}</List>
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
