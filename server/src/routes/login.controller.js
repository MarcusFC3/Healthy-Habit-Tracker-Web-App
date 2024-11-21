"use strict"

const express = require("express");
const bcrypt = require("bcrypt");
const sql = require("mssql");
const { adminconf } = require("../models/dbusers")
// const {serverAdminConnection} = require("../models/user");

let userId = 0;
/**
 * First checks for existing users with matching credentials, 
 * then adds user to database
 */
function signup(req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    console.log(firstName)
    console.log(lastName)
    if(!firstName, !lastName, !username, !email, !password){
        return res.status(400).json({
            status: "Failure",
            message: "One or more fields were empty"
        })
    }
    else if (firstName === "" || lastName === "" || username === "" || email === "" || password === "") {
        return res.status(400).json({
            status: "Failure",
            message: "One or more fields were empty"
        })
        /*
            Need better regex name testing
        */
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
    } else if (!/^[a-z]/i.test(lastName)) {
        return res.status(400).json({
            status: "Last name must only contain alphabectic characters"
        })
    }
    else {
        async function checkIfUserExists(email) {
            const connectionPool = await sql.connect(adminconf);
            let request = await connectionPool.request();
            request = await request.input("email", sql.VarChar, `${email}`);
            return await request.query("SELECT email FROM Users WHERE email = @email")
        }
        checkIfUserExists(email).then((result) => {
            if (result.recordset[0]) {
                return res.status(400).json({
                    status: "Failure",
                    message: "An account with that email already exists"
                }
                )
            } else {
                async function addUserToDb(firstName, lastName, username, email, password) {
                    console.log("added lol " + firstName)
                    const connection = await sql.connect(adminconf);
                    const request = connection.request();
                    //Generate salt seperatly and store it in the database along with the password
                    const hashedpassword = await new Promise((resolve, reject) => {
                        bcrypt.hash(password, 10, (err, hash) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(hash) 
                            }
                        });

                    })

                    request.input("firstName", sql.VarChar, firstName);//put all fields in
                    request.input("lastName", sql.VarChar, lastName);
                    request.input("username", sql.VarChar, username);
                    request.input("email", sql.VarChar, email);
                    request.input("password", sql.VarChar, hashedpassword);

                    return await request.query("INSERT INTO Users (firstName,lastName, username, email, hashedPassword) VALUES (@firstName, @lastName, @username, @email, @password)");
                }

                addUserToDb(firstName, lastName, username, email, password).then(
                    () => {

                        return res.status(200).json({
                            status: "Success",
                            message: "Account was successfully created"
                        })
                    }
                ).catch((err) => {
                    console.log(`an error occured during signup for ${firstName} ${lastName} ${err}`)
                    return res.status(500).json({
                        status: "Failure",
                        message: "Something went wrong, try again later"
                    })
                })
            }

        })
    } 
}

function login(req, res, next) {
    let { email, password } = req.body;
    console.log(req.body)
    if (email === "" || password === "") {
        return res.status(400).json({
            status: "Failure",
            message: "One or more fields are empty"
        })
    } else {
        async function checkformatch(email) {
            const connection = await sql.connect(adminconf);
            const request = connection.request()
            request.input("email", sql.VarChar, email)
            return await request.query("SELECT * FROM Users WHERE email = @email ")
            // unhash the password
            
        }
        checkformatch(email).then
        (
            (result) => 
            {
                console.log(result)
                if (result.recordset.length != 0) 
                {
                    const correctPassword = bcrypt.compare(result.recordset[0]['hashedPassword'], password)
                    if (correctPassword) 
                    {
                        
                        next();
                    } else 
                    {
                        return res.status(400).json({
                            status: "Failure",
                            message: "Incorrect password or email"
                        })
                    }
                } else 
                {
                    return res.status(400).json({
                        status: "Failure",
                        message: "No accounts match this email"
                    })
                }
            }
        ).catch
        (
            (err) => 
            {
                console.log(err)
                return res.status(400).json({
                    result: "error",
                    message: "Encountered an error"
                })
            }
        )


    }
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
