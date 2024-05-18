const poolConnection = require("../database/connection");

const liveCodeHandler = {
    serverReceiveAndBroadcastData: (socket, roomCode) => {
        socket.on(`SEND-${roomCode}`, (data) => {
            console.log(
                "Data received in room " + roomCode + ": " + data.value
            );
            poolConnection.query(
                `UPDATE TABLE rooms SET body = '${data.value}' WHERE code = '${roomCode}'`
            );
            socket.broadcast.to(roomCode).emit(`RECEIVE-${roomCode}`, data);
        });
    },
};

module.exports = liveCodeHandler;
