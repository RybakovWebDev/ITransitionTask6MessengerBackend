const mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

// Static add message method
messagesSchema.statics.addMsg = async function (_id, sender, recipient, title, body) {
  const message = await this.create({ _id, sender, recipient, title, body });
  console.log("Created message:", message);
  return message;
};

const Message = mongoose.model("message", messagesSchema);

module.exports = Message;
