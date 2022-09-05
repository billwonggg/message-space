const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Success!");
});

const server = http.createServer(app);

const connectedUsers = new Map();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const joinRoomUpdateMap = (room, user) => {
  if (!connectedUsers.has(room)) {
    connectedUsers.set(room, []);
  }
  connectedUsers.get(room).push(user);
};

const leaveRoomUpdateMap = (room, user) => {
  if (!connectedUsers.has(room)) return;

  let userList = connectedUsers.get(room);
  userList = userList.filter((u) => u !== user);
  connectedUsers.set(room, userList);
};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.username = data.name;
    socket.room = data.room;
    socket.join(data.room);
    joinRoomUpdateMap(data.room, data.name);
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

  socket.on("get_users_list", (data) => {
    console.log(`${data.name} requested users_list: ${connectedUsers.get(data.room) ?? []}`);
    console.log(socket.id);
    io.to(socket.id).emit("receive_users_list", connectedUsers.get(data.room) ?? []);
  });

  socket.on("leave_room", (data) => {
    leaveRoomUpdateMap(data.room, data.name);
    socket
      .to(data.room)
      .emit("receive_admin_message", { msg: `${data.name} has left the room.`, type: "info" });
    console.log(`${data.name} left room ${data.room}`);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.username} has disconnected from room ${socket.room}`);
    if (socket.username && socket.room) {
      leaveRoomUpdateMap(socket.room, socket.username);
      io.in(socket.room).emit("receive_admin_message", {
        msg: `${socket.username} has disconnected.`,
        type: "warning",
      });
    }
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
