require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const usersRoutes = require("./routes/users");
const collectionsRoutes = require("./routes/collections");
const itemsRoutes = require("./routes/items");
const User = require("./models/userModel");
const { default: mongoose } = require("mongoose");
const Collection = require("./models/collectionModel");

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/users", usersRoutes);
app.use("/api/collections", collectionsRoutes);
app.use("/api/items", itemsRoutes);

// connect to db
mongoose.set("strictQuery", false); // remove this?
mongoose
  .connect(process.env.MONG_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to the db");

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//////////////////////////////

User.find((err, users) => {
  if (err) {
    console.log(err);
  } else {
    console.log(users);
  }
});

Collection.find((err, collections) => {
  if (err) {
    console.log(err);
  } else {
    console.log(collections);
  }
});

//////////////////////////////
