const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const PORT = 3001;

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data.room);
    socket
      .to(data.room)
      .emit("receive_admin_message", { msg: `${data.name} has joined the room.`, type: "info" });
    console.log(`${data.name} joined room ${data.room}`);
  });

  socket.on("send_message", (messageData) => {
    console.log(
      `${messageData.sender} sent "${messageData.message}" to room ${messageData.room} at time ${messageData.time}`
    );
    socket.to(messageData.room).emit("receive_message", messageData);
  });

  socket.on("leave_room", (data) => {
    console.log(`${data.name} left room ${data.room}`);
    socket
      .to(data.room)
      .emit("receive_admin_message", { msg: `${data.name} has left the room.`, type: "info" });
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
