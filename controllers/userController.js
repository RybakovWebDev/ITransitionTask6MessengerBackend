const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

const getUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email,
      admin: user.admin,
      likedItems: user.likedItems,
      status: user.status,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { _id, email, name, password, admin, likedItems, status } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user = await User.signup(_id, email, name, password, admin, likedItems, status);

    const token = createToken(user._id);

    res.status(200).json({ _id, email, name, admin, likedItems, status, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "No such user to delete" });
  }
  res.status(200).json(user);
};

const patchUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ error: "No such user to update" });
  }
  res.status(200).json(user);
};

module.exports = {
  getUsers,
  getUser,
  loginUser,
  createUser,
  deleteUser,
  patchUser,
};
