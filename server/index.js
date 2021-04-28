const express = require("express");
const exampleRoute = require("./api/example/exampleRoute");
const roomsRoute = require("./api/rooms/roomsRoute");
const settingsRoute = require("./api/settings/settingsRoute");
const statsRoute = require("./api/stats/statsRoute");

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/", (req, res) => {
  res.send("Some shit");
});

app.use("/example", exampleRoute);
app.use("/rooms", roomsRoute);
app.use("/settingsRoute", settingsRoute);
app.use("/stats", statsRoute);
app.use("/settings", settingsRoute);

app.listen(PORT);
