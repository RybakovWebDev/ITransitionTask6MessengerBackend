const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

////// GET all users
const getUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
};

////// GET a single user
const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

////// LOGIN user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create a token
    const token = createToken(user._id);

    res
      .status(200)
      .json({ _id: user.id, name: user.name, email, admin: user.admin, likedItems: user.likedItems, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

////// SIGNUP new user
const createUser = async (req, res) => {
  const { _id, email, name, password, admin, likedItems } = req.body;

  // Error Handling
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

  // add user to db
  try {
    const user = await User.signup(_id, email, name, password, admin, likedItems);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ _id, email, name, admin, likedItems, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

////// DELETE a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "No such user to delete" });
  }
  res.status(200).json(user);
};

////// PATCH a user
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
