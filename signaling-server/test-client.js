const io = require('socket.io-client');

const client1 = io('http://localhost:5000');
const client2 = io('http://localhost:5000');

// Client 1 joins room
client1.on('connect', () => {
  console.log('✓ Client 1 connected:', client1.id);
  client1.emit('join-room', 'test-room');
});

// Client 2 joins room
client2.on('connect', () => {
  console.log('✓ Client 2 connected:', client2.id);
  client2.emit('join-room', 'test-room');
});

// Listen for user-joined event
client1.on('user-joined', (data) => {
  console.log('✓ Client 1 received user-joined:', data.userId);
  // Send offer
  client1.emit('offer', { to: data.userId, offer: { type: 'offer', sdp: 'mock-sdp' } });
});

// Listen for offer
client2.on('offer', (data) => {
  console.log('✓ Client 2 received offer from:', data.from);
  // Send answer
  client2.emit('answer', { to: data.from, answer: { type: 'answer', sdp: 'mock-sdp' } });
});

// Listen for answer
client1.on('answer', (data) => {
  console.log('✓ Client 1 received answer from:', data.from);
});

// Listen for chat messages (relayed from the server)
client1.on('chat-message', (data) => {
  console.log('<< Client 1 received chat message from', data.from + ':', data.message);
});

client2.on('chat-message', (data) => {
  console.log('<< Client 2 received chat message from', data.from + ':', data.message);
});

setTimeout(() => {
  console.log('\n--- Sending Test Chat Message ---');
  const chatMessage = { message: 'Hello Client 2, can you hear me?' };

  // Client 1 sends a message. The server will relay it to Client 2.
  client1.emit('chat-message', chatMessage);

  // Give the server time to process and send the message
  setTimeout(() => {
    console.log('\n--- Test Complete ---');
    client1.disconnect();
    client2.disconnect();
    process.exit(0);
  }, 1000); // Shorter timeout after sending message
}, 3000);