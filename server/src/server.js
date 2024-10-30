const express = require("express");
const https = require("https");
const app = require("./app");

const server = https.createServer(app);
const PORT = 8000;

server.listen(PORT,() =>{
    console.log("Server is listening");
})