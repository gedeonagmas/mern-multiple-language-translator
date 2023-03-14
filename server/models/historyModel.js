const mongoose = require("mongoose");
const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: Number,
  from: String,
  to: String,
  text: String,
  translation: String,
});
exports.History = mongoose.model("history", historySchema);
