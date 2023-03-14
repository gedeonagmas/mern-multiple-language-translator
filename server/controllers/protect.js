const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { User } = require("../models/usersModel");
exports.protect = async (req, res, next) => {
  let token, user;
  if (req.headers.token) {
    token = req.headers.token;
  }
  if (token === "null" || !token)
    return res.status(200).json({ message: "tokens not found" });
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  user = await User.findById(decode.id);
  if (!user) return res.status(200).json({ message: "users not found" });
  req.user = user;
  next();
};
