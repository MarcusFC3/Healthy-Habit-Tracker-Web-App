const express = require("express");
const http = require("http");
const app = require("./app");
const mysql2 = require("mysql2");
const { error } = require("console");

const server = http.createServer(app);
const PORT = 8000;



server.listen(PORT,() =>{
    console.log("Server is listening");
    const serverAdminConnection = mysql2.createConnection({
        host: "localhost",
        user: "serveradministrator",
        password: "administrator142",
        database: "SimplyHealth",
        port: 57161,
        TrustServerCertificate: true
    })
    serverAdminConnection.connect((error) =>{
        console.log("Hello " + error);
    })
})