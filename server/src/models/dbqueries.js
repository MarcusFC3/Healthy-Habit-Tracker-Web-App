const express = require("express");
const bcrypt = require("bcrypt");
const sql = require("mssql");
const { adminconf } = require("../models/dbusers")
const { response } = require("../app");
const get = {
    TeamIDFromName: async function getTeamIDFromName(teamName) {
        const connectionPool = await sql.connect(adminconf);
        let request = await connectionPool.request();
        request = await request.input("teamName", sql.VarChar, `${teamName}`);
        return await request.query("SELECT TeamID FROM Teams WHERE TeamName = @teamName")
    },
    UsersFromTeamID: async function getUsersFromTeamID(teamID) {
        const connectionPool = await sql.connect(adminconf);
        let request = await connectionPool.request();
        request = await request.input("TeamID", sql.Int, `${teamID}`);
        return await request.query("SELECT firstName + lastName as Name, Username FROM Users WHERE TeamID = @TeamID")
    },

    UsersFromTeam: function getUsersFromTeam(teamName) {
        TeamIDFromName(teamName).then((response => {
            if (!response.recordset[0]) {
                return "teamNotFound"
            }
            else {
                let teamID = response.recordset[0].TeamID
                return getUsersFromTeamID(teamID).then(response => {//add await 
                    if (!response.recordset[0]) {
                        return "teamNotFound"
                    } else {
                        return response.recordset
                    }
                })
            }
        }))
    },

    CompanyIDFromName: async function getCompanyIDFromName(companyName) {
        const connectionPool = await sql.connect(adminconf);
        let request = await connectionPool.request();
        request = await request.input("companyName", sql.VarChar, `${companyName}`);
        return await request.query("SELECT CompanyID FROM Companies WHERE CompanyName = @companyName");
    },
    TeamsFromCompanyID: async function getTeamsFromCompanyID(CompanyID) {
        const connectionPool = await sql.connect(adminconf);
        let request = await connectionPool.request();
        request = await request.input("CompanyID", sql.Int, `${CompanyID}`);
        return await request.query("SELECT TeamName FROM Teams WHERE CompanyID = @CompanyID");
    },

    CompanyIDFromTeamID: async function getCompanyIDFromTeamID(TeamID) {
        const connectionPool = await sql.connect(adminconf);
        let request = await connectionPool.request();
        request = await request.input("TeamID", sql.Int, TeamID);
        return await request.query("SELECT CompanyID FROM Teams WHERE TeamID = 1")
    },

    TeamsFromCompany: function getTeamsFromCompany(CompanyName) {

    }
}

const check = {
    IfUserExists: async function checkIfUserExists(email) {
        const connectionPool = await sql.connect(adminconf);
        let request = await connectionPool.request();
        request = await request.input("email", sql.VarChar, `${email}`);
        return await request.query("SELECT email FROM Users WHERE email = @email")
    },

    IfCompanyExists: async function checkIfCompanyExists(email) {
        const connectionPool = await sql.connect(adminconf);
        let request = await connectionPool.request();
        request = await request.input("email", sql.VarChar, `${email}`);
        return await request.query("SELECT CompanyName FROM Companies WHERE CompanyName = @CompanyName")
    },
    ForMatchingPassword: async function checkformatch(email) {
        const connection = await sql.connect(adminconf);
        const request = connection.request()
        request.input("email", sql.VarChar, email)
        return await request.query("SELECT * FROM Users WHERE email = @email ")
        // unhash the password

    }
}
const add = {
    UserToDbWIthTeam : async function addUserToDbWithTeam(firstName, lastName, username, email, password, companyName) {
        const connection = await sql.connect(adminconf);
        const request = connection.request();
        //Generate salt seperatly and store it in the database along with the password
        const salt = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("" + salt)
                    resolve(salt)
                }
            })
        })
        const hashedpassword = await new Promise((resolve, reject) => {

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(hash)
                }
            });

        })
        
        request.input("companyName", sql.VarChar, companyName);
        await request.query("SELECT TeamID FROM Teams WHERE companyName = @companyName").then(
            (result)=>{
                console.log(JSON.stringify(result))
                const teamID = result.recordset[0]['TeamID']
                console.log(teamID)
                request.input("TeamID", sql.Int, teamID);
                
                if (!teamID){
                    return res.status(400).json({
                        status: "Failure",
                        message: "Team named '" + companyName + "' Does not exist"
                    })
                }
            }
        )

        request.input("firstName", sql.VarChar, firstName);//put all fields in
        request.input("lastName", sql.VarChar, lastName);
        request.input("username", sql.VarChar, username);
        request.input("email", sql.VarChar, email);
        request.input("password", sql.VarChar, hashedpassword);

        return await request.query("INSERT INTO Users (firstName,lastName, username, email, hashedPassword, TeamID) VALUES (@firstName, @lastName, @username, @email, @password, @companyName)");
    }
}
module.exports = {
    get,
    check,
    add
}