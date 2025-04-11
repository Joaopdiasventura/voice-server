const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => res.send("Hello World"));

io.on("connection", (socket) => {
  console.log("Novo usuário conectado:", socket.id);

  socket.on("offer", (data) => {
    console.log("Recebido offer:", data);
    socket.broadcast.emit("offer", data);
  });

  socket.on("answer", (data) => {
    console.log("Recebido answer:", data);
    socket.broadcast.emit("answer", data);
  });

  socket.on("candidate", (data) => {
    console.log("Recebido candidate:", data);
    socket.broadcast.emit("candidate", data);
  });

  socket.on("disconnect", () =>
    console.log("Usuário desconectado:", socket.id)
  );
});

server.listen(3000, "0.0.0.0", () => console.log("Server running"));
