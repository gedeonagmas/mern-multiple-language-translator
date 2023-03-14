const express = require("express");
const { createUser } = require("../controllers/createUser");
const { history } = require("../controllers/history");
const { login } = require("../controllers/login");
const { protect } = require("../controllers/protect");
const { translate } = require("../controllers/translateHandler");
const { validator } = require("./../utils/validators/validator");

const route = express.Router();

route.post("/translate", protect, translate);
route.post("/create/users", validator, createUser);
route.post("/login", login);
route.get("/get/history", protect, history);
module.exports = { route };
