require("dotenv").config();
const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users");
const collectionsRoutes = require("./routes/collections");
const itemsRoutes = require("./routes/items");
const { default: mongoose } = require("mongoose");
const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/users", usersRoutes);
app.use("/api/collections", collectionsRoutes);
app.use("/api/items", itemsRoutes);

mongoose.set("strictQuery", false);
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
