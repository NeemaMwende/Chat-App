import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";

//routes
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messages.js";
import conversationRoutes from "./routes/conversations.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//using the imported routes
app.use('/api/auth', authRoutes);
app.use('/api/conversations', messageRoutes);
app.use('/api/messages', conversationRoutes);

io.on("connection", (socket) => {
  console.log("a user connected");
  // Handle other socket events here
});

//middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

  
// Start the server
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
