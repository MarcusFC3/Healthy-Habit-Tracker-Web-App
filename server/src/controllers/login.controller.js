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
            console.log(JSON.stringify(result.recordset[0]) + "asdasdd")
            if (result.recordset[0]) {
               


                return res.status(400).json({
                    status: "Failure",
                    message: "An account with that email already exists"
                }
                )
            } else {
                dbqueries.check.IfCompanyExists(companyName).then((result) => {
                    if (!result.recordset[0]) {
                        return res.status(400).json({
                            status: "Failure",
                            message: "The Company " + companyName + " does not exist"
                        }
                        )}
                
            
                dbqueries.add.userToDbAddToCompanyAndTeam(firstName, lastName, username, email, password, teamName, companyName).then(
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
            )

            }

        })
    }
}


function CreateTeam(req, res){

}

function switchUserTeam(req, res){

}

function deleteTeam(req, res){

}

function deleteCompany(req, res){

}
function addTeamLeader(req, res){

}
function removeTeamLeader(req, res){

}
function addCompanyLeader(req, res){
    
}
function removeCompanyLeader(req, res){

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
                    const correctPassword = bcrypt.compare(result.recordset[0]['hashedpassword'], password)
                    if (correctPassword) {
                       console.log("Correct password input!") 
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
                
                
                dbqueries.add.UserToDbCreateCompanyAndTeam(firstName, lastName, username, email, password, teamName, companyName).then(
                    () => {
                        console.log("WHAT????")
                        return res.status(200).json({
                            status: "Success",
                            message: "Account was successfully created"
                        })
                    }
                )
                .catch((err) => {
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


//it broken =(
function passwordReset(req, res) {
    const email = req.body.email;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword
    console.log(email)
    dbqueries.check.ForMatchingPassword(email).then
        (
            (result) => {
                console.log(result)
                if (result.recordset.length != 0) {
                    const correctPassword = bcrypt.compare(result.recordset[0]['hashedpassword'], oldpassword)
                    if (correctPassword) {
                        console.log("Correct password input!") 
                        console.log("changing password...")
                        //change password
                        dbqueries.update.resetPassword(newpassword, email).then(
                            (result) =>{
                                return res.status(200).json({
                                    status: "Success",
                                    message: "Password successfully updated"
                                })
                            }
                        )
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

