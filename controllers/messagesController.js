const Message = require("../models/messageModel");

////// GET all messages
const getMessages = async (req, res) => {
  const allMessages = await Message.find({});

  res.status(200).json(allMessages);
};

////// GET all messages for a user
const getMessagesUser = async (req, res) => {
  const { id } = req.params;

  const messages = await Message.find({ recipient: id });

  if (!messages) {
    return res.status(404).json({ error: "No such message found." });
  }

  res.status(200).json(messages);
};

////// POST new message
const postMessage = async (req, res) => {
  const { _id, sender, recipient, title, body } = req.body;

  // add message to db
  try {
    const message = await Message.addMsg(_id, sender, recipient, title, body);

    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: "Could not post a message." });
  }
};

module.exports = {
  getMessages,
  getMessagesUser,
  postMessage,
};
