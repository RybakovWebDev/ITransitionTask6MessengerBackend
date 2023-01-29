require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const usersRoutes = require("./routes/users");
const messagesRoutes = require("./routes/messages");
const User = require("./models/userModel");
const { default: mongoose } = require("mongoose");
const Message = require("./models/messageModel");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

// Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://artask6frontend.onrender.com",
    credentials: true,
  },
});

io.on("connection", function (socket) {
  console.log("a user connected", socket.id);

  socket.on("getMessages", async function (name) {
    console.log("Messeges requested for user: ", name);

    const userMessages = await Message.find({ recipient: name });
    console.log("Here they are", userMessages);

    io.emit(`${name}Messages`, userMessages);
  });

  socket.on("notifyRecipient", async function (name) {
    console.log("Gotta send messages to recipient:", name);
    const userMessages = await Message.find({ recipient: name });
    console.log("Here they are", userMessages);

    io.emit(`${name}Messages`, userMessages);
  });

  socket.on("disconnect", function () {
    console.log("User Disconnected");
  });
});
httpServer.listen(5000);

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/users", usersRoutes);
app.use("/api/messages", messagesRoutes);

// connect to db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONG_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to the db");
  })
  .catch((error) => {
    console.log(error);
  });
