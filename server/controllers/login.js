const { User } = require("./../models/usersModel");
const { tokRes } = require("./tokenGenerator");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!email || !password)
    return res.status(400).json({ message: "provide email and password" });
  if (!user || !(await user.checkPasswordMatch(password, user.password)))
    return res.status(400).json({ message: "invalid email or password" });
  return tokRes({ user, res, sc: 200, done: "you are logged in successfully" });
};
