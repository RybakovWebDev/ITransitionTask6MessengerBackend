const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [4, "Must be at least 4 characters long"],
  },
  admin: { type: Boolean, required: true },
  likedItems: { type: Array },
  status: { type: Boolean, required: true },
});

userSchema.statics.signup = async function (_id, email, name, password, admin, likedItems, status) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ _id, email, name, password: hash, admin, likedItems, status });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  if (user.status === false) {
    throw Error("User is blocked");
  }

  return user;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
