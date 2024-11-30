const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const port = 8087;

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});