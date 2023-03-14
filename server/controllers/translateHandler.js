const axios = require("axios");
const { History } = require("../models/historyModel");

exports.translate = async (req, res) => {
  const { text, source, target, values, keys } = req.body;
  let lang1, lang2;

  values.map((t, i) => {
    if (t === source) {
      lang1 = keys[i];
      return lang1;
    }
    return lang1;
  });

  values.map((s, i) => {
    if (s === target) {
      lang2 = keys[i];
      return lang2;
    }
    return lang2;
  });

  const options = {
    method: "POST",
    url: "https://translate-plus.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
    },
    data: { text: text, source: source, target: target },
  };

  axios
    .request(options)
    .then(async function (response) {
      await History.create({
        user: req.user._id,
        date: Date.now(),
        from: lang1,
        to: lang2,
        text: response.data.translations.text,
        translation: response.data.translations.translation,
      });

      const history = await History.find({ user: req.user._id }).sort({
        date: -1,
      });
      if (!history) {
        return res.status(404).send("something went wrong");
      }
      res.status(200).json({ text: response.data, history: history });
    })
    .catch(function (error) {
      res
        .status(500)
        .json({ message: "something went wrong unable to translate" });
    });
};
