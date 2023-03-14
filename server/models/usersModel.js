const mongoose = require("./../db/db");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  confirmPassword: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.checkPasswordMatch = async function (
  password,
  candidatePassword
) {
  return await bcrypt.compare(password, candidatePassword);
};

exports.User = mongoose.model("users", userSchema);
