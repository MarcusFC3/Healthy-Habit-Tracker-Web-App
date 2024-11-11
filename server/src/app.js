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

app.use(express.static(path.join(__dirname,"..","public")));
// app.use(session({
//     secret: "hashed secret",
//     cookie: {
//       maxAge: 30000  
//     },
//     resave: false,
//     saveUninitialized: false,
// }))

app.use("/activities", activitiesRouter)
app.use("/login", loginRouter);

app.get("/", (req, res) => {return res.send("Buh")})    


module.exports = app;