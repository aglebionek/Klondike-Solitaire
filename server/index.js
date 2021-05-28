const express = require("express");
const exampleRoute = require("./api/example/exampleRoute");
const roomsRoute = require("./api/rooms/roomsRoute");
const settingsRoute = require("./api/settings/settingsRoute");
const statsRoute = require("./api/stats/statsRoute");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
app.get("/", (req, res) => {
  res.send("Some shit");
});

app.use("/example", exampleRoute);
app.use("/rooms", roomsRoute);
app.use("/settingsRoute", settingsRoute);
app.use("/stats", statsRoute);
app.use("/settings", settingsRoute);

app.listen(PORT);
