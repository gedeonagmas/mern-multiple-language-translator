const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("express-async-errors");
const { route } = require("./routes/route");

require("dotenv").config();
const app = express();
require("./models/historyModel");
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(route);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("unable to connect to the server");
  }
  console.log("server connected on port " + process.env.PORT);
});
