const express = require('express');  // Import the Express framework
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const app = express();    // Create an Express application
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillswap';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error', err));

// Routes
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

// Redirect root URL to login page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Serve static files (dashboard.html, login.html, etc.)
app.use(express.static(__dirname));

// Store active user connections
const userConnections = {};

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // User connects with their email
  socket.on('user_login', (email) => {
    userConnections[email] = socket.id;
    console.log(`${email} is online`);
    io.emit('user_online', { email, timestamp: new Date() });
  });

  // Handle new messages
  socket.on('send_message', (data) => {
    const { from, to, text, time } = data;
    
    // Get recipient's socket ID
    const recipientSocketId = userConnections[to];
    
    if (recipientSocketId) {
      // Send message to recipient
      io.to(recipientSocketId).emit('receive_message', {
        from,
        text,
        time,
        hasUnread: true
      });
      
      io.to(recipientSocketId).emit('message_notification', {
        from,
        preview: text.substring(0, 50),
        time
      });
    } else {
      // Let sender know the recipient is not connected
      socket.emit('message_failed', {
        to,
        reason: 'Recipient is offline or not connected.'
      });
    }
  });

  // User disconnect
  socket.on('disconnect', () => {
    for (let email in userConnections) {
      if (userConnections[email] === socket.id) {
        delete userConnections[email];
        console.log(`${email} is offline`);
        io.emit('user_offline', { email });
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});