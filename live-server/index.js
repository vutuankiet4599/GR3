const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const liveCodeHandler = require("./event/live-code");
require("dotenv").config();

const app = express();

const PORT = process.env.APP_PORT || 3000;

app.use(
    cors({
        origin: "*",
        methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

io.on("connection", (socket) => {
    let roomCode = socket.handshake.query.roomCode || "";
    console.log("User connected with " + roomCode);
    if (roomCode) {
        socket.join(roomCode);
    }

    liveCodeHandler.serverReceiveAndBroadcastData(socket, roomCode);

    socket.on("disconnect", () => {
        console.log("User disconnected from room " + roomCode);
        socket.disconnect();
        socket.leave(roomCode);
    });
});

app.get("/", (req, res) => {
    res.json({
        ok: 1,
    });
});

server.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});
