const express = require("express");
const { getMessages, postMessage, getMessagesUser } = require("../controllers/messagesController");

const router = express.Router();

// GET all messages
router.get("/", getMessages);

// GET all messages for a user
router.get("/:id", getMessagesUser);

// POST a message
router.post("/", postMessage);

module.exports = router;
