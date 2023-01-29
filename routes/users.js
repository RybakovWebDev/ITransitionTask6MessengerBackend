const express = require("express");
const { getUsers, getUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// GET all users
router.get("/", getUsers);

// GET a single user
router.get("/:id", getUser);

// LOGIN user
router.post("/login", loginUser);

module.exports = router;
