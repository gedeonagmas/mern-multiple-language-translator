const { validationResult } = require("express-validator");
const { User } = require("./../models/usersModel");

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).send(errors.array());
  }
  const { email, password } = req.body;
  const data = await User.create({
    email,
    password,
  });
  res.status(201).send(data);
};
