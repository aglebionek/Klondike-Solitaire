const express = require("express");
const cookieParser = require("cookie-parser");
const exampleRoute = require("./api/example/exampleRoute");
const roomsRoute = require("./api/rooms/roomsRoute");
const settingsRoute = require("./api/settings/settingsRoute");
const statsRoute = require("./api/stats/statsRoute");
const authRoute = require("./api/auth/authRoute");
const accountRoute = require("./api/account/accountRoute");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  modifyRoom,
  getAllUsers,
  setUsersInGame
} = require("./utils/users");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cookieParser());

const server = app.listen(PORT);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Some shit");
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("export-users", () => {
    socket.emit("pass-users", getAllUsers().filter(user => !user.inGame));
  });

  socket.on("export-room", () => {
    const user = getCurrentUser(socket.id);

    if (user) {
      socket.emit("pass-room", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });

  socket.on("game-start", ({ room }) => {
    setUsersInGame(room);
    io.to(room).emit('start');
  });

  socket.on("lobby-modify", ({ room, newName }) => {
    modifyRoom(room, newName);
  });

  socket.on("lobby-join", ({ player, room }) => {
    const user = userJoin(socket.id, player, room);

    console.log("a user joined the room");
    socket.join(user.room);

    if(user){
      io.to(room).emit("pass-room", {
        room,
        users: getRoomUsers(room),
      });
    }
  });

  socket.on("lobby-leave", () => {
    const user = getCurrentUser(socket.id);

    userLeave(socket.id);

    io.to(user.room).emit("pass-room", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("kick", ({ player }) => {
    userLeave(player.id);
    io.to(player.id).emit("kicked", { room: player.room });

    io.to(player.room).emit("pass-room", {
      room: player.room,
      users: getRoomUsers(player.room),
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    userLeave(socket.id);
    socket.emit("export-room");
  });
});

app.use("/example", exampleRoute);
app.use("/rooms", roomsRoute);
app.use("/auth", authRoute);
app.use("/stats", statsRoute);
app.use("/settings", settingsRoute);
app.use("/account", accountRoute);
