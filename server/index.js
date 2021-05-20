const express = require("express");
const cookieParser = require("cookie-parser");
const exampleRoute = require("./api/example/exampleRoute");
const roomsRoute = require("./api/rooms/roomsRoute");
const settingsRoute = require("./api/settings/settingsRoute");
const statsRoute = require("./api/stats/statsRoute");
const authRoute = require("./api/auth/authRoute");
const accountRoute = require("./api/account/accountRoute");
const cors = require('cors');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  modifyRoom,
  getAllUsers,
} = require("./utils/users");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();
const server = app.listen(PORT);
// socket variables
const { Server } = require("socket.io");
const io = new Server(server);

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

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Some shit");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("export-users", () => {
    socket.emit("pass-users", getAllUsers());
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

  socket.on("lobby-modify", ({ room, newName }) => {
    modifyRoom(room, newName);
  });

  socket.on("lobby-join", ({ player, room }) => {
    const user = userJoin(socket.id, player, room);

    console.log("a user joined the room");
    socket.join(user.room);
    socket.emit("export users");
  });

  socket.on("lobby-leave", () => {
    console.log("a user left the room");
    userLeave(socket.id);
    socket.emit("export users");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    userLeave(socket.id);
    socket.emit("export users");
  });
});

app.use("/example", exampleRoute);
app.use("/rooms", roomsRoute);
app.use("/auth", authRoute);
app.use("/stats", statsRoute);
app.use("/settings", settingsRoute);
app.use("/account", accountRoute);
