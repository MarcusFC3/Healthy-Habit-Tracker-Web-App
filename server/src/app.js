const express = require("express");
const mssql = require("mssql");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { adminconf } = require("./models/user")
const MssqlStore = require("mssql-session-store");

const loginRouter = require("./routes/login.router");


const app = express();


// const sessionStore = new MssqlStore( {
//     connection: "",
//     ttl: 3600,
//     reapInterval: 3600,
//     reapCallback: function() { console.log('expired sessions were removed'); }

// }
// )

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname,"..","public")));
// app.use(session({
//     secret: "hashed secret",
//     cookie: {
//       maxAge: 30000  
//     },
//     resave: false,
//     saveUninitialized: false,
// }))

app.use("/", loginRouter)

app.get("/*", (req, res) =>{
    res.sendFile(path.join(__dirname,"..","public","index.html"))
})


module.exports = app;