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



loginRouter.post("/", loginController.login)

loginRouter.use("/", createSession),

loginRouter.post("/signup", loginController.signup)


function createSession(req, res) {
    console.log("SESSION")
    passport.initialize()
    const customFields = {
        usernameField: "uname",
        passwordField: "pw"
    }
    const store = new MssqlStore({
        server: "localhost\\SQLEXPRESSBPA",
        user: "serveradministrator",
        password: "admin",
        database: "SimplyHealth",
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
        
    },)
    passport.serializeUser((user, done)=>{
    
       let userData = req.user
       console.log("Aw Yeah, This is Happennin'!\n\n\n" + userData.id)
       done(null, userData.id)
    });

    session({
        resave: false,
        saveUninitialized: false,
        key: "key_name",
        secret: "secret_session",
        store: store
    }
    )
    passport.initialize()
    passport.session()

}
module.exports = loginRouter;