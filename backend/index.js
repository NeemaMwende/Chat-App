import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import http from 'http';
import socket from 'socket.io-client';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;


const app = express();
dotenv.config()

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("a user connected");
});

// const socket = io();
// socket.io("connect", () => {
//     console.log("Connected to server");
// });

mongoose.connect(process.env.MONGO_URI, 
     //{ useNewUrlParser: true, useUnifiedTopology: true }
).then(()=> console.log("Connected to MongoDB"));
// mongoose.connection.once('open', () => console.log('Connected to MongoDB'));



server.listen(PORT, () => console.log(`listening on port ${PORT}`));