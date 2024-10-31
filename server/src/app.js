const express = require("express");
const mysql = require("mysql");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const loginRouter = require("./routes/login.router");


const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname,"..","public")));

app.use("/", loginRouter)

app.get("/*", (req, res) =>{
    res.sendFile(path.join(__dirname,"..","public","index.html"))
})


module.exports = app;