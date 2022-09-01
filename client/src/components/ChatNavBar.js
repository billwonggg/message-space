import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

const ChatNavBar = ({ userData, socket }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO leave chat
    try {
      socket.emit("leave_room", userData);
      navigate("/register");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GroupsRoundedIcon fontSize="large" sx={{ display: "flex", mr: 2 }} />
          <Typography
            noWrap
            component="a"
            href="/"
            sx={{
              mr: "auto",
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              fontSize: {
                xs: 26,
                md: 32,
              },
            }}
          >
            MessageSpace
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 600,
              }}
            >
              Leave Room
            </Typography>
            <LogoutIcon sx={{ ml: 2 }} />
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ChatNavBar;
