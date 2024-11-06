const express = require("express");
const bcrypt = require("bcrypt");
const sql = require("mssql");
const { adminconf } = require("../models/user")
// const {serverAdminConnection} = require("../models/user");

let userId = 0;
function signup(req, res) {
    let { firstName, lastName, username, email, password } = req.body;
    if (firstName === "" || lastName === "" || username === "" || email === "" || password === "") {
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
        console.log("Checking Db...")
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
                    const connection = await sql.connect(adminconf);
                    const request = connection.request();
                    const hashedpassword = await new Promise((resolve, reject) => {
                        bcrypt.hash(password, 10, (err, hash) => {
                            if (err) {
                                reject(err);
                                console.log("blud" + err);
                            }
                            else {
                                console.log("We made it here!")
                                console.log(hash + "+ buh")
                                resolve(hash)
                            }
                        });

                    })

                    if (typeof hashedpassword !== "string") {
                        return res.status(500).json({
                            status: "Failure",
                            message: "Something went wrong, try again later"
                        })

                    }
                    console.log("we out...")

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
                    console.log("an error occured" + err)
                    return res.status(500).json({
                        status: "Failure",
                        message: "Something went wrong, try again later"
                    })
                })
            }

        })
    }
}

function login(req, res) {
    let { email, password } = req.body;
    if (email === "" || password === "") {
        return res.status(400).json({
            status: "Failure",
            message: "One or more fields are empty"
        })
    } else {
        async function checkformatch(email) {
            const connection = await sql.connect(adminconf);
            const request = connection.request() 
            console.log(email + " JaneD@gmail.com")
            request.input("email", sql.VarChar, email)
            return await request.query("SELECT hashedPassword FROM Users WHERE email = @email ")
            // unhash the password
           
        
        }
        checkformatch(email).then(
            (result)=>{
                console.log(result.recordset[0]['hashedPassword'])
                const correctPassword = bcrypt.compare(result.recordset[0]['hashedPassword'], password).catch(
                    (err) => {
                        throw err
                    }
                )
                if (correctPassword) {
                    req.session.user = {
                        //relevant user data
                    }
                    return res.status(200).json({
                        status: "success",
                        message: "Account login successful"
                    })
                } else {
                    return res.status(400).json({
                        status: "Failure",
                        message: "Incorrect password or email"
                    })
                }
            }
        ).catch(
            (err) => {
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
