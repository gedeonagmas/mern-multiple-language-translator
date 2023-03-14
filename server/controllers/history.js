const { History } = require("./../models/historyModel");

exports.history = async (req, res, next) => {
  const history = await History.find({ user: req.user._id });
  res.status(200).send(history);
};
