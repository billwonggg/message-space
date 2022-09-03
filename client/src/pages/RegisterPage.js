import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Select, InputLabel, FormControl, MenuItem, useTheme } from "@mui/material";
import { Button, Typography, Box } from "@mui/material";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { SelectThemeContext } from "../theme/ThemeContext";
import { sendNotification } from "../util/notificationHelper";
import Footer from "../components/Footer";
import ThemeButton from "../components/ThemeButton";

const ROOMOPTIONS = [...Array(50).keys()];

const RegisterPage = ({ setUserData, socket }) => {
  const [input, setInput] = useState({
    name: "",
    room: "",
  });

  const theme = useTheme();
  const [darkMode] = useContext(SelectThemeContext);

  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setInput({ ...input, [name]: event.target.value });
  };

  const joinRoom = (event) => {
    event.preventDefault();
    if (!input.name || !input.room) {
      sendNotification("Please fill out the fields below", "error", darkMode);
      return;
    }

    if (!socket.connected) {
      sendNotification("Error connecting to the server", "error", darkMode);
      return;
    }

    try {
      socket.emit("join_room", input);
      setUserData({ name: input.name, room: input.room });
      navigate("/chat");
    } catch (e) {
      sendNotification("Server error, please try again later", "error", darkMode);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: theme.palette.background.bgGradient,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemeButton
        sx={{
          position: "absolute",
          top: "15px",
          right: "10px",
          color: theme.palette.register.background,
        }}
      />
      <Box
        boxShadow={3}
        backgroundColor="register.background"
        sx={{
          width: { xs: "360px", md: "525px" },
          padding: { xs: 4, md: 8 },
          borderRadius: "10px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <GroupsRoundedIcon sx={{ mr: 2, fontSize: { xs: "32px", md: "38px" } }} />
          <Typography
            component="h1"
            display="inline-block"
            sx={{
              fontSize: { xs: 28, md: 36 },
              textAlign: "center",
              fontFamily: "Monospace",
              fontWeight: 600,
            }}
          >
            MessageSpace
          </Typography>
        </Box>
        <form noValidate onSubmit={joinRoom}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Name"
            value={input.name}
            type="text"
            autoFocus
            onChange={handleChange("name")}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Room Number</InputLabel>
            <Select
              label="Room Number"
              onChange={handleChange("room")}
              value={input.room}
              MenuProps={{ PaperProps: { sx: { maxHeight: "30vh" } } }}
            >
              {ROOMOPTIONS.map((i) => (
                <MenuItem value={i + 1} key={i}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            size="large"
          >
            Join
          </Button>
        </form>
      </Box>
      <Footer />
    </div>
  );
};

export default RegisterPage;
