const express = require("express");

const loginController = require("./login.controller");

loginRouter = express.Router();

loginRouter.post("/login", login())

loginRouter.post("/signup", signup())

module.exports = loginRouter;