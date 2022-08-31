import { useState } from "react";
import Textfield from "@mui/material/TextField";
import { Button, Typography, Box, Container } from "@mui/material";

const RegisterPage = () => {
  const [input, setInput] = useState({
    name: "",
    roomNumber: undefined,
  });

  const handleChange = (name) => (event) => {
    setInput({ ...input, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.name === "" || input.roomNumber === undefined) return;

    // TODO: connect with backend socket.io

    // clear input
    setInput({ name: "", roomNumber: undefined });
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
            value={input.roomNumber}
            type="number"
            autoFocus
            onChange={handleChange("roomNumber")}
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
