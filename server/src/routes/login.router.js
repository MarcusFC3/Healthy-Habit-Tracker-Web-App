const express = require("express");

const loginController = require("./login.controller");

loginRouter = express.Router();

loginRouter.post("/", loginController.login)

loginRouter.post("/signup", loginController.signup)

module.exports = loginRouter;