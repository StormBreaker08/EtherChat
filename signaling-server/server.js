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
const socketRooms = {}; // Track which room each socket is in

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('join-room', (roomCode) => {
    if (!rooms[roomCode]) rooms[roomCode] = [];
    rooms[roomCode].push(socket.id);
    socketRooms[socket.id] = roomCode; // Track the room
    socket.join(roomCode);
    console.log(`User ${socket.id} joined room ${roomCode}`);
    socket.to(roomCode).emit('user-joined', { userId: socket.id });
  });

  socket.on('offer', (data) => {
    const userRoom = socketRooms[socket.id];
    if (!userRoom || !data.to) return;
    if (!rooms[userRoom].includes(data.to)) return; // Verify recipient is in same room
    socket.to(data.to).emit('offer', { from: socket.id, offer: data.offer });
  });

  socket.on('answer', (data) => {
    const userRoom = socketRooms[socket.id];
    if (!userRoom || !data.to) return;
    if (!rooms[userRoom].includes(data.to)) return; // Verify recipient is in same room
    socket.to(data.to).emit('answer', { from: socket.id, answer: data.answer });
  });

  socket.on('ice-candidate', (data) => {
    const userRoom = socketRooms[socket.id];
    if (!userRoom || !data.to) return;
    if (!rooms[userRoom].includes(data.to)) return; // Verify recipient is in same room
    socket.to(data.to).emit('ice-candidate', { from: socket.id, candidate: data.candidate });
  });

  socket.on('chat-message', (data) => {
    const userRoom = socketRooms[socket.id];
    if (!userRoom) return;

    // Send the message to all OTHER sockets in the room
    socket.to(userRoom).emit('chat-message', { from: socket.id, message: data.message });
    console.log(`User ${socket.id} sent message to room ${userRoom}: ${data.message}`);
  });

  socket.on('disconnect', () => {
    const roomCode = socketRooms[socket.id];
    console.log('User disconnected:', socket.id);
    
    if (roomCode && rooms[roomCode]) {
      rooms[roomCode] = rooms[roomCode].filter(id => id !== socket.id);
      io.to(roomCode).emit('user-left', { userId: socket.id });
      if (rooms[roomCode].length === 0) delete rooms[roomCode];
    }
    delete socketRooms[socket.id];
  });

  
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Signaling server running on http://localhost:${PORT}`);
});