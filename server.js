const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const port = 8087;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // 클라이언트가 실행 중인 URL
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(msg);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});