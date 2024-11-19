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
const bodyParser = require("body-parser")

const activitiesRouter = require("./routes/activities.router");
const loginRouter = require("./routes/login.router");

const app = express();
app.use(bodyParser.json())
app.use(express.json());
app.use(helmet())
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

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: true, sameSite: "none",maxAge:  60 * 60 * 1000},
  

}));
app.use(passport.initialize())
app.use(passport.session())
const local = new LocalStrategy(()=>{
    
    
        
  const customFields = {
      usernameField: "uname",
      passwordField: "pw"
  }
  
  
  console.log(userData)
  console.log("DUDEUIHOHUBU IT BROKEN WHYYY")
  return done(null, userData)
})
passport.use(local)
passport.serializeUser((userData, done)=>{
  
   
  console.log("Athast cap to be honest your honor")
   return done(null, userData.id)
 
  
});


app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user + "user data");
  next();
})



function checkLoggedIn(req, res, next){
  const isLoggedIn = true;
  if (!isLoggedIn){
    return res.status(401).json({
      error: "You must login"
    })
  }
  next();
}
/**
 * 
 * Take a look at how stored procedure's may be able to stop sql injection
 */
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
app.use(morgan('combined'));

app.use(
    sanitizer.clean({
      xss: true,
      noSql: true,
      sql: true,
      sqlLevel: 5,
      noSqlLevel: 5, 
    })
  );


//possibly add this to login router/controller?
app.get("/auth/google", (req, res) => { //endpoint for google authentication

} )

app.get("/auth/google/callback", (req, res) =>{

})
app.get("/asd", (req, res)=>{
  res.send("test.html")

})
app.get("/logout", (req, res) =>{

})

app.use("/activities",checkLoggedIn, activitiesRouter)
app.use("/login", loginRouter);

app.get("/", (req, res) => {return res.send("Buh")})    


module.exports = app;
// fetch(
//   "login",
  
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         "email": "22936@my4County.com",
//         "password": "konrad222"
//     })
//     }
// )