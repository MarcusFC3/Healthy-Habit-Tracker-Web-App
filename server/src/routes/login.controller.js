const express = require("express");
const bcrypt = require("bcrypt");
const sql = require("mssql");
const { adminconf } = require("../models/user")
// const {serverAdminConnection} = require("../models/user");

function signup(req, res) {
    let { firstName, lastName, username, email, password } = req.body;
    username = username;
    email = email;
    password = password;
    if (firstName === "" || lastName === "" || username === "" || email === "" || password === "") {
        return res.status(400).json({
            status: "Failure",
            message: "One or more fields were empty"
        })
    } else if (!/^[a-z0-9]+$/i.test(username)) {
        return res.status(400).json({
            status: "Failure",
            message: "Username must only contain alphanumeric characters"
        })
    } else if (!/^[a-z]/i.test(firstName)) {
        return res.status(400).json({
            status: "Failure",
            message: "First name must only contain alphabectic characters"
        })
    } else if (!/^[a-z]/i.test(localStorageName)) {
        return res.status(400).json({
            status: "Last name must only contain alphabectic characters"
        })
    }
    else {
        async function checkIfUserExists(email) {
            const connectionPool = await sql.connect(adminconf);
            const request = await connectionPool.request();
            request = request.input(email, sql.VarChar, `${email}`);
            const result = request.query("SELECT @email FROM Users");
            connectionPool.close();
            return result === email
        }
        if (checkIfUserExists(email)) {
            return res.status(400).json({
                status: "Failure",
                message: "An account with that email already exists"
            })
        }
        else {
            try {
                async function addUserToDb(firstName, lastName, username, email, password) {
                    password = bcrypt.hash(password);
                    const connection = await sql.connect(adminconf);
                    const request = connection.request();
                    request = request.input()//put all fields in
                    const result = request.query("INSERT INTO Users (firstName, lastName, username, email, hashedpassword) VALUES (@firstName, @lastName, @email, @password)");
                    //if result is successfull
                    return res.status(200).json({
                        status: "Successful",
                        message: "account successfully added"
                    })

                }
                addUserToDb(firstName, lastName, username, email, password)
            }
            catch (e) {
                return res.status(500).json({
                    status: "Failure",
                    message: "Something went wrong, try again later"
                })
            }
        }
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