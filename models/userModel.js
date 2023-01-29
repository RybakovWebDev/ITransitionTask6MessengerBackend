const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
});

// Static signup/login method
userSchema.statics.login = async function (_id, name) {
  const exists = await this.findOne({ name });
  console.log('This is "exists": ', exists);
  if (exists) return exists;

  const user = await this.create({ _id, name });
  console.log("Created user:", user);
  return user;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
