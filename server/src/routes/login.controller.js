const express = require("express");
const bcrypt = require("bcrypt");
const sql = require("mssql");
const { adminconf } = require("../models/user")
// const {serverAdminConnection} = require("../models/user");

let userId = 0;
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
    } else if (!/^[a-z]/i.test(lastName)) {
        return res.status(400).json({
            status: "Last name must only contain alphabectic characters"
        })
    }
    else {
        console.log("Checking Db...")
        async function checkIfUserExists(email) {
            const connectionPool = await sql.connect(adminconf);
            let request = await connectionPool.request();
            request = await request.input("email", sql.VarChar, `${email}`);
            await request.query("SELECT email FROM Users WHERE email = @email").then(
                (res) => { connectionPool.close(); 
                    console.log("email =" + email  + "res =" + JSON.stringify(res) + res['recordset'].length);
                    console.log("" + res['recordset'].length > 0);
                    return res['recordset'].length > 0
        }).catch((err) => {console.log("an error has occured\n" + err.toString() )});
            
           
        }
        console.log("calling function brother" + checkIfUserExists(email).then((yes) => {console.log(JSON.stringify(yes))}))
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
                    request.query("INSERT INTO Users (FullName, username, email, hashedpassword) VALUES (@firstName @lastName, @email, @password)")
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
    let {email, password} = req.body;
    if (email === "" || password === ""){
        return res.status(400).json({
            status: "Failure",
            message: "One or more fields are empty"
        })
    } else{
        async function checkformatch(email, password) {
            const connection = await sql.connect(adminconf);
            const request = connection.request()
            request = request.input("email", sql.VarChar(), email)
            const result = sql.query("SELECT hashedpassword FROM Users WHERE email = '@email' ")
            // unhash the password
            if (result === password) {
                req.session.user = {
                    //relevant user data
                }
                return res.status(200).json({
                    status: "success",
                    message: "Account login successful"
                })
            } else{
                return res.status(400).json({
                    status: "Failure",
                    message : "Incorrect password or email"
                })
            }
        }
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