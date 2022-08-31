import { useState } from "react";
import { TextField, Select, InputLabel, FormControl, MenuItem } from "@mui/material";
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
    <Container
      component="main"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <Box boxShadow={3} sx={{ padding: 8 }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <form noValidate onSubmit={handleSubmit}>
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
              MenuProps={{ PaperProps: { sx: { maxHeight: "50vh" } } }}
            >
              {[...Array(50).keys()].map((i) => (
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
    </Container>
  );
};

export default RegisterPage;
