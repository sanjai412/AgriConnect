const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // For development, allow all
        methods: ['GET', 'POST'],
    },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Connection Placeholder
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Socket.io for Real-time chat & notifications
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('send_message', (data) => {
        io.to(data.roomId).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Routes
const authRoutes = require('./routes/auth');
const queryRoutes = require('./routes/queries');
const responseRoutes = require('./routes/responses');
const learningRoutes = require('./routes/learning');
const userRoutes = require('./routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('AgriConnect API is running...');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
