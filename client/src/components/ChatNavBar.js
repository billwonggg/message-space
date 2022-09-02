import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Button, useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ThemeButton from "./ThemeButton";

const ChatNavBar = ({ userData, socket }) => {
  const navigate = useNavigate();

  const theme = useTheme();

  const handleLogout = () => {
    // TODO leave chat
    try {
      socket.emit("leave_room", userData);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppBar position="static" color="secondary">
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
                xs: 24,
                md: 32,
              },
            }}
          >
            MessageSpace
          </Typography>
          <ThemeButton sx={{ mr: { md: 3 }, color: theme.palette.secondary.navBar }} />

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
            <LogoutIcon sx={{ ml: { md: 2 } }} />
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ChatNavBar;
