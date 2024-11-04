const express = require("express");
const http = require("http");
const app = require("./app");
const sql = require("mssql");
const { error } = require("console");
const { connectionString } = require("connection-string")


const server = http.createServer(app);
const PORT = 8000;



server.listen(PORT, () => {
    console.log("Server is listening");
    /*
    install and enable sql server browser using server installation center.
    start the service.
    include localhost/ip in server field 
    */
})    