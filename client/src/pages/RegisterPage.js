import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ThemeButton from "../components/ThemeButton";
import { SelectThemeContext } from "../theme/ThemeContext";
import { loadingNotif, sendNotif, updateNotif } from "../util/notificationHelper";
import "./RegisterPage.css";

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

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  let loading = false;
  const joinRoom = async (event) => {
    event.preventDefault();
    if (loading) return;
    if (!input.name || !input.room) {
      sendNotif("Please fill out all the fields below", "error", darkMode);
      return;
    }

    loading = true;
    const id = loadingNotif("Connecting to the server...", darkMode);

    let tries = 0;
    while (!socket.connected) {
      if (tries === 20) {
        // after 60 seconds, send error message
        updateNotif(id, "Connection failed, try again later", "error", darkMode);
        loading = false;
        return;
      }
      // try to connect every 3 seconds (Azure cold start)
      await sleep(3000);
      socket.connect();
      tries++;
    }

    try {
      socket.emit("join_room", input);
      setUserData({ name: input.name, room: input.room });
      navigate("/chat");
    } catch (e) {
      updateNotif(id, "Error joining the room", "error", darkMode);
    }
    updateNotif(id, "Connected to the server", "success", darkMode);
    loading = false;
  };

  return (
    <div
      className="register-container"
      style={{ backgroundImage: theme.palette.background.bgGradient }}
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
          borderRadius: { xs: "20px", md: "10px" },
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
