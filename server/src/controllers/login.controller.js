"use strict"

const express = require("express");
const bcrypt = require("bcrypt");
const sql = require("mssql");
const { adminconf } = require("../models/dbusers");
const dbqueries = require("../models/dbqueries");
// const {serverAdminConnection} = require("../models/user");
const nodemailer = require("nodemailer");

let userId = 0;
//TODO 
//shorten async function calls
//Remove Debugging console logs

function inputValidation(bodyobj) {//FI Regex expressions
    const body = Object.values(bodyobj);
    console.log(bodyobj);
   

    for (let i = 0; i < body.length; i++) {
        console.log(body[i]);
        if (!body[i]) {
            return { // IF ERROR return false instead, maybe return json?
                status: "Failure",
                message: "One or more fields were absent"
            }
        } else if (body[i] === "") {
            console.log("giggity")
            return {
                status: "Failure",
                message: "One or more fields were empty"
            }
        }
        console.log(!/^[^a-z]+$/i.test(body[1]))
        if (body.firstName === body[i] || body.lastName === body[i] || body.companyName === body[i]) {
            if (/^[a-z]*$/i.test(body[1])) {
                return {
                    status: "Failure",
                    message: "must only contain alphanumeric characters"//add specific field name 
                }
            } else if (body.username === body[i]) {
                if (/^[a-z0-9]+$/i.test(body[i])) {
                    return {
                        status: "Failure",
                        message: "must only contain alphanumeric characters"//add specific field name 
                    }
                }
            }
        }
    }
    return {
        status: "Success",
        message: "The input is valid"
    }
}


function signupUser(req, res) {
    /**
     * Currently contains signupCompany code. needs to only insert user into desired team.
     */
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let teamName = req.body.teamName;
    let companyName = req.body.companyName;
    console.log(firstName)
    console.log(lastName)
    const valid = inputValidation({ firstName, lastName, username, email, password })
    console.log(valid)
    if (valid.status === "Failure") {
        return res.status(400).json({ valid })
    }
    else {
        dbqueries.check.IfUserExists(email).then((result) => {
            if (result.recordset[0]) {
                return res.status(400).json({
                    status: "Failure",
                    message: "An account with that email already exists"
                }
                )
            } else {
                

                dbqueries.add.UserToDbWithTeam(firstName, lastName, username, email, password, teamName, companyName).then(
                    () => {
                        console.log("WHAT????")
                        return res.status(200).json({
                            status: "Success",
                            message: "Account was successfully created"
                        })
                    }
                ).catch((err) => {
                    console.log(`an error occured during signup for ${firstName} ${lastName} ${JSON.stringify(err)}`)
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
    const valid = inputValidation(req.body)
    console.log(valid)
    if (valid["status"] == "Failure") {
        return res.status(400).json(valid)
    }

    dbqueries.check.ForMatchingPassword(email).then
        (
            (result) => {
                console.log(result)
                if (result.recordset.length != 0) {
                    const correctPassword = bcrypt.compare(result.recordset[0]['hashedPassword'], password)
                    if (correctPassword) {

                        next();
                    } else {
                        return res.status(400).json({
                            status: "Failure",
                            message: "Incorrect password or email"
                        })
                    }
                } else {
                    return res.status(400).json({
                        status: "Failure",
                        message: "No accounts match this email"
                    })
                }
            }
        ).catch
        (
            (err) => {
                console.log(err)
                return res.status(400).json({
                    result: "error",
                    message: "Encountered an error"
                })
            }
        )
}



function signupCompany(req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let teamName = req.body.teamName;
    let companyName = req.body.companyName;
    console.log(firstName)
    console.log(lastName)
    const valid = inputValidation({ firstName, lastName, username, email, password })
    console.log(valid)
    if (valid.status === "Failure") {
        return res.status(400).json({ valid })
    }
    else {
        dbqueries.check.IfUserExists(email).then((result) => {
            if (result.recordset[0]) {
                return res.status(400).json({
                    status: "Failure",
                    message: "An account with that email already exists"
                }
                )
            } else {
                

                dbqueries.add.UserToDbWithTeam(firstName, lastName, username, email, password, teamName, companyName).then(
                    () => {
                        console.log("WHAT????")
                        return res.status(200).json({
                            status: "Success",
                            message: "Account was successfully created"
                        })
                    }
                ).catch((err) => {
                    console.log(`an error occured during signup for ${firstName} ${lastName} ${JSON.stringify(err)}`)
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
    const valid = inputValidation(req.body)
    console.log(valid)
    if (valid["status"] == "Failure") {
        return res.status(400).json(valid)
    }

    dbqueries.check.ForMatchingPassword(email).then
        (
            (result) => {
                console.log(result)
                if (result.recordset.length != 0) {
                    const correctPassword = bcrypt.compare(result.recordset[0]['hashedPassword'], password)
                    if (correctPassword) {

                        next();
                    } else {
                        return res.status(400).json({
                            status: "Failure",
                            message: "Incorrect password or email"
                        })
                    }
                } else {
                    return res.status(400).json({
                        status: "Failure",
                        message: "No accounts match this email"
                    })
                }
            }
        ).catch
        (
            (err) => {
                console.log(err)
                return res.status(400).json({
                    result: "error",
                    message: "Encountered an error"
                })
            }
        )
}


//it broken =(
function passwordReset(req, res) {
    const email = req.body.email
    console.log(email)
    async function checkformatch(email) {
        const connection = await sql.connect(adminconf);
        const request = connection.request()
        request.input("email", sql.VarChar, email)
        return await request.query("SELECT firstName, email FROM Users WHERE email = @email ")

    }
    dbqueries.check.ForMatchingPassword(email).then(
        (result) => {
            console.log(result)
            if (result.recordset.length != 0) {
                /*
                might need Oauth 2
                */
                // Create a transporter object
                const transporter = nodemailer.createTransport({
                    host: 'smtp.office365.com', // use false for STARTTLS; true for SSL on port 465
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'simplyhealthorg@outlook.com',
                        pass: 'tzlcgvtfvhbuafab',
                    }
                });

                // Configure the mailoptions object
                const mailOptions = {
                    from: 'simplyhealthorg@outlook.com',
                    to: 'simplyhealthorg@outlook.com',
                    subject: 'Hello world',
                    text: 'Hello world.'
                };
                transporter.verify((error, success) => {
                    if (error) {
                        console.log(error)
                        res.status(500).send("")
                    } else {
                        console.log("Nice")
                    }
                })
                // Send the email
                // transporter.sendMail(mailOptions, function (error, info) {
                //     if (error) {
                //         console.log('Error:', error);
                //         res.status
                //     } else {
                //         console.log('Email sent: ', info.response);
                //         return res.status(200).json({
                //             status: "success",
                //             message:"Email Sent!"
                //         });
                //     }
                // });
            }
            else {
                console.log("buh where da email");
            }
        }
    ).catch(
        (error) => {
            console.log(error)
            res.status(500).json({
                status: "failure",
                message: "it was a failure..."
            })
        }
    )
}

function resetPassword(req, res) {
    accEmail = req.body.email
    newPassword = req.body.password

    //sql query UPDATE Users SET hashedPassword to bcrypt(new password) WHERE email = accEmail

}


module.exports = {
    login,
    signupUser,
    signupCompany,
    passwordReset,
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

