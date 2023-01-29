const User = require("../models/userModel");

////// GET all users
const getUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
};

////// GET a single user
const getUser = async (req, res) => {
  const { _id } = req.params;

  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

////// LOGIN user
const loginUser = async (req, res) => {
  const { _id, name } = req.body;

  try {
    const user = await User.login(_id, name);

    res.status(200).json({ _id: user.id, name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  loginUser,
};
