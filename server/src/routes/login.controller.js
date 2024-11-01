const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
// const {serverAdminConnection} = require("../models/user");

function signup(req, res) {
    let { fullName, username, email, password } = req.body;
    username = username;
    email = email;
    password = password;
    if (fullName === "" || username === "" || email === "" || password === "") {
        return res.status(400).json({
            status: "Failure",
            message: "One or more fields were empty"
        })
    } else if (!/^[a-z0-9]+$/i.test(username)) {
        return res.status(400).json({
            status: "Failure",
            message: "Username must only contain alphanumeric characters"
        })
    } else if (!/^[a-z]/i.test(fullName)) {
        return res.status(400).json({
            status: "Failure",
            message: "Name must only contain alphabectic characters"
        })
    }
    else {
        const serverAdminConnection = mysql.createConnection({
            host: "10.44.142.88",
            user: "serveradministrator",
            password: "administrator142",
            database: "SimplyHealth",
            port: 57161,
            TrustServerCertificate: true
        })
        console.log("1212121")
        serverAdminConnection.on("error", (err) => console.log("An error occured with the database. Again. ush. \n" + err))
        serverAdminConnection.connect((error) => {
            console.log("starting connection...")
            if (error) {
                console.log(error);
                console.log("Something went wrong...");
                serverAdminConnection.end();
            } else {
                console.log("MySql Connected!" + serverAdminConnection.json());
                serverAdminConnection.query(`SELECT email FROM Users WHERE email=${email}`, (error, res) => {
                    console.log("starting query")
                    if (error) {
                        console.log("Failiure")
        
                    }
                    else {
                        console.log("Success!")
                    }
        
                    serverAdminConnection.end()
                })
            }
        });
      

        //check if user already exists
        //Create a new user with this data
        // return res.status(200).json({
        //     fullName: fullName,
        //     username: username,
        //     email: email,
        //     password: password
        // })
        //log them in
    }

}

function login(req, res) {

}

module.exports = {
    login,
    signup,
}

/*
    fetch("http://localhost:8000/signup", 
{
    "method":"post",
     "headers":{"Content-Type" : "appication/json" },
    "body":{
        "fullName" : "John Doe",
        "username" : "John45",
        "email" : "johnD@gmail.com",
        "password" : "password"
    }
})
*/