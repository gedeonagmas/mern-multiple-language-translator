const axios = require("axios");

exports.language = async (req, res) => {
  const axios = require("axios");

  const options = {
    method: "POST",
    url: "https://translate-plus.p.rapidapi.com/language_detect",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "aaf20aa949msh22e4f4c023e5b73p18967djsnd90519c79a97",
      "X-RapidAPI-Host": "translate-plus.p.rapidapi.com",
    },
    data: '{"text":"How are you?"}',
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
