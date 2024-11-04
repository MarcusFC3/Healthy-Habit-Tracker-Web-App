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

   async function connect(){
    let pool;
    try{
    pool = await sql.connect({
        server: "localhost\\SQLEXPRESS",
        user: "serveradministrator",
        password: "admin",
        database: "SimplyHealth",
 
        options: { 
            encrypt: true, // Use true for Azure or if required by your server
            trustServerCertificate: true // Set to true to bypass certificate validation
        }
    });
    const result = await pool.request().query("SELECT * FROM Users")
    console.log(result.recordset)
    }
    catch (err) {
        console.log("SQL error", err)
    }finally{
        if (pool){
            await pool.close()
        }
    }
}
connect()
})    