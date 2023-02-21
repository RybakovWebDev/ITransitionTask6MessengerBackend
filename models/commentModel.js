// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const commentsSchema = new Schema({
//   _id: { type: String, required: true },
//   text: { type: String, required: true },
//   author: { type: String, required: true },
//   date: { type: Date, required: true },
//   item: { type: String, required: true },
// });

// // Static add collection method
// commentsSchema.statics.addComment = async function (_id, text, author, date, item) {
//   const comment = await this.create({ _id, text, author, date, item });
//   console.log("Created comment:", comment);
//   return comment;
// };

// const Comment = mongoose.model("comment", commentsSchema);

// module.exports = Comment;
