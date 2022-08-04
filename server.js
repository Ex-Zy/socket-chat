const express = require("express");

const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("assets"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", (socket) => {
  console.log("User is connected", socket.id);

  socket.on("chat:message", (msg) => {
    io.emit("chat:message", msg);
  });

  socket.on("disconnect", () => console.log("Disconected user"));
});

server.listen(3000, () => {
  console.log("App listen 3000 port");
});
