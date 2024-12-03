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
const {Strategy} = require("passport-local");

const loginController = require("../controllers/login.controller"); 

const loginRouter = express.Router();



loginRouter.post("/", loginController.login, passport.authenticate('local'), (req,res) =>{
    console.log("skibodi");
    return res.status(200).json({
        status: "success!",
        message: "User has successfully logged in!"
    })

})
loginRouter.post("/pwdreset", loginController.passwordResetEmail)



loginRouter.post("/signup", loginController.signup)

function createSession(req, res) {
}
module.exports = loginRouter;