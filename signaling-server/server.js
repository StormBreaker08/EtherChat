const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(cors());

const rooms = {};

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('join-room', (roomCode) => {
    if (!rooms[roomCode]) rooms[roomCode] = [];
    rooms[roomCode].push(socket.id);
    socket.join(roomCode);
    console.log(`User ${socket.id} joined room ${roomCode}`);
    socket.to(roomCode).emit('user-joined', { userId: socket.id });
  });

  socket.on('offer', (data) => {
    socket.to(data.to).emit('offer', { from: socket.id, offer: data.offer });
  });

  socket.on('answer', (data) => {
    socket.to(data.to).emit('answer', { from: socket.id, answer: data.answer });
  });

  socket.on('ice-candidate', (data) => {
    socket.to(data.to).emit('ice-candidate', { from: socket.id, candidate: data.candidate });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (const r in rooms) {
      rooms[r] = rooms[r].filter(id => id !== socket.id);
      socket.to(r).emit('user-left', { userId: socket.id });
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Signaling server running on http://localhost:${PORT}`);
});