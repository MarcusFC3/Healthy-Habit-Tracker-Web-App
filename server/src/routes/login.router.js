"use strict"

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const MssqlStore = require("connect-mssql-v2");
const helmet = require("helmet");
const sanitizer = require("perfect-express-sanitizer");
const cookieSession = require("cookie-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const loginController = require("./login.controller"); 


const loginRouter = express.Router();



loginRouter.post("/", loginController.login,   passport.authenticate('local',{
    successRedirect: 'https://localhost:8000/login', // The user logged in fine, redirect them do the dashboard
failureRedirect: 'https://localhost:8000/login/signup',
}))
loginRouter.get("/signup", (req, res) => {
    res.status(500).json({
        status: "cooked"
    })
})

loginRouter.get("/login", (req, res) => {
    res.status(500).json({
        status: "cooking with gas"
    })
})



loginRouter.post("/signup", loginController.signup)

 
function createSession(req, res) {
}
module.exports = loginRouter;