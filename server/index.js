const express = require("express");
const exampleRoute = require("./api/example/exampleRoute");
const roomsRoute = require("./api/rooms/roomsRoute");
const settingsRoute = require("./api/settings/settingsRoute");
const statsRoute = require("./api/stats/statsRoute");
const authRoute = require("./api/auth/authRoute");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Some shit");
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/example", exampleRoute);
app.use("/rooms", roomsRoute);
app.use("/auth", authRoute);
app.use("/stats", statsRoute);
app.use("/settings", settingsRoute);

app.listen(PORT);
