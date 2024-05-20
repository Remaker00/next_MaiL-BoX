const http = require('http');
const socketIo = require('socket.io');

const setupSocket = (app) => {
    const server = http.createServer(app);
    const io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return { server, io };
};

module.exports = setupSocket;
