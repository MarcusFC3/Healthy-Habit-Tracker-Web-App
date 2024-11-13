"use strict"

const express = require("express");
const mssql = require("mssql");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const MssqlStore = require("mssql-session-store");
const helmet = require("helmet");
const sanitizer = require("perfect-express-sanitizer");
const cookieSession = require("cookie-session");

const activitiesRouter = require("./routes/activities.router");
const loginRouter = require("./routes/login.router");

const app = express();


// const sessionStore = new MssqlStore( {
//     connection: "",
//     ttl: 3600,
//     reapInterval: 3600,
//     reapCallback: function() { console.log('expired sessions were removed'); }

// }
// )

app.use(helmet())
app.use(cookieSession({
  name: 'session',
  maxAge:  24* 60 * 60 * 1000,
  keys: [ '123', '1234' ]
}))
function checkLoggedIn(req, res, next){
  const isLoggedIn = true;
  if (!isLoggedIn){
    return res.status(401).json({
      error: "You must login"
    })
  }
    next();
}

function checkPermissions(req, res, next){
  const permissions = true;
  if (!permissions){
    return res.status(401).json({
      error: "You must login"
    })
  }
  next();
}

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(
    sanitizer.clean({
      xss: true,
      noSql: true,
      sql: true,
      sqlLevel: 5,
      noSqlLevel: 5,
    })
  );
app.use(morgan('combined'));

//possibly add this to login router/controller?
app.get("/auth/google", (req, res) => { //endpoint for google authentication

})

app.get("/auth/google/callback", (req, res) =>{

})

app.get("/logout", (req, res) =>{

})

app.use("/activities",checkLoggedIn, activitiesRouter)
app.use("/login", loginRouter);

app.get("/", (req, res) => {return res.send("Buh")})    


module.exports = app;