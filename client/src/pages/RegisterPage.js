import { useState } from "react";
import Textfield from "@mui/material/TextField";
import { Button, Typography, Box, Container } from "@mui/material";

const RegisterPage = ({ setUserData }) => {
  const [input, setInput] = useState({
    name: "",
    room: "",
  });

  const handleChange = (name) => (event) => {
    setInput({ ...input, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.name || !input.room) return;

    // TODO: connect with backend socket.io

    // clear input
    setUserData({ name: input.name, room: input.room });
    setInput({ name: "", room: "" });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box boxShadow={3} sx={{ padding: 8 }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Textfield
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            value={input.name}
            type="text"
            autoFocus
            onChange={handleChange("name")}
          />

          <Textfield
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Room Number"
            value={input.room}
            type="number"
            autoFocus
            onChange={handleChange("room")}
          />
          <Button type="submit" margin="normal" fullWidth variant="contained" color="primary">
            Join
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
