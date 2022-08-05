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

  socket.on("chat:clear", () => {
    io.emit("chat:clear");
  });

  socket.on("disconnect", () => console.log("Disconected user"));
});

const HOST = "localhost";
const PORT = 5500;

server.listen(PORT, HOST, () => {
  console.log(`App listen on http://${HOST}:${PORT}`);
});
