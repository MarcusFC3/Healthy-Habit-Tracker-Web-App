const express = require("express");
const bcrypt = require("bcrypt");
const sql = require("mssql");
const { adminconf } = require("../models/dbusers");


//personal activities

//team activities: will give each person on the team the activity.
//there will also be a central team activity which tracks how many relevant 
//individual activities have been completed
//

/*
 * Company activites will give each team a team activity and have a central 
 * company activity which tracks how many relevant team activites have been completed 
 */


function getUserActivityData(req, res) {
    if (!req.session.passport) {
        res.status(400).json({
            status: "Failure",
            message: "You must login to view activity data"
        })
    } else{
        async function getUserActivities(UserID) {
            const connection = await sql.connect(adminconf);
            const request = connection.request();
            request.input("UserID", sql.Int, UserID);
            return await request.query("SELECT * FROM UserActivities WHERE UserID = @UserID")
            }
        getUserActivities(req.session.passport.user.UserID).then((results) => {
            return res.status(200).json({
                "status": "success",
                "StatsByTeamID": results.recordset
            })
        })
    }
}
function viewTopTeams(req, res) {
if (!req.session.passport) {
    res.status(400).json({
        status: "Failure",
        message: "You must login to view the leaderboard"
    })
} else{
    async function getTeamsData(CompanyID) {
        const connection = await sql.connect(adminconf);
        const request = connection.request();
        request.input("CompanyID", sql.Int, CompanyID);
        return await request.query("SELECT TeamID, TeamName FROM Teams WHERE CompanyID = @CompanyID").then(
            async (result) => {
                let StatsByTeam = {}
                let whereString = ""
                console.log(JSON.stringify(result.recordset[0]))
                for (let i = 0; i < result.recordset.length; i++) {
                    let TeamID = result.recordset[i]["TeamID"]
                    let TeamName = result.recordset[i]["TeamName"]
                    request.input("TeamID" + i, sql.Int, TeamID);
                    whereString = "@TeamID" + i
                    
                    await request.query("SELECT * FROM TeamActivities WHERE TeamID = " + whereString).then((result) => {
                        console.log(JSON.stringify(result))
                        let started = result.recordsets[0].length
                        let completed = 0;
                        for (let i = 0; i < started; i++) {
                            if (result.recordsets[0]["completed"] === true) {
                                completed++;
                            }
                            StatsByTeam[TeamID] = [TeamName, started, completed]
                        }
                    })
                }
                return StatsByTeam;
            }
        )
    }
    getTeamsData(req.session.passport.user.CompanyID).then((StatsByTeam) => {
        console.log(StatsByTeam);
        return res.status(200).json({
            "status": "success",
            "StatsByTeamID": StatsByTeam
        })
    })
}
}
function viewTopUsers(req, res) {
    if (!req.session.passport) {
        res.status(400).json({
            status: "Failure",
            message: "You must login to view the leaderboard"
        })
    } else{
    async function getUsersData(CompanyID) {
        const connection = await sql.connect(adminconf);
        const request = connection.request();
        request.input("CompanyID", sql.Int, CompanyID);
        return await request.query("SELECT UserID, firstName + ' ' + lastName as FullName FROM Users WHERE TeamID in (SELECT TeamID FROM Teams Where CompanyID = @CompanyID)").then(
            async (result) => {
                let StatsByUser = {}
                let whereString = ""
                console.log(JSON.stringify(result.recordset[0]))
                for (let i = 0; i < result.recordset.length; i++) {
                    let UserID = result.recordset[i]["UserID"]
                    let Name = result.recordset[i]["FullName"]
                    request.input("UserID" + i, sql.Int, UserID);
                    whereString = "@UserID" + i
                    
                    await request.query("SELECT TOP 100 * FROM UserActivities WHERE UserID = " + whereString).then((result) => {
                        console.log(JSON.stringify(result))
                        let started = result.recordsets[0].length
                        let completed = 0;
                        for (let i = 0; i < started; i++) {
                            if (result.recordsets[0]["completed"] === true) {
                                completed++;
                            }
                            StatsByUser[UserID] = [Name, started, completed]
                        }
                    })
                }
                return StatsByUser;
            }
        )
    }
    getUsersData(req.session.passport.user.CompanyID).then((StatsByUser) => {
        console.log(StatsByUser);
        return res.status(200).json({
            "status": "success",
            "StatsByTeamID": StatsByUser
        })
    })
    }
}
function createUserActivity(req, res) {
    let date = new Date()
    let { UserID, ActivityName, repsorduration, amount, activityDescription } = req.body;//many variables may be predetermined by activites we create
    //Input validation
    if (!UserID || !ActivityName || !repsorduration || !amount) {
        return res.status(400).json({
            status: "Failure",
            message: "One or more required parameters are missing"
        })
    } else if (isNaN(UserID)) {
        return res.status(500).json({
            status: "Failure",
            message: "The field 'UserID' must be an integer"
        })
    } else {
     
        async function addUserActivityToDb(UserID, ActivityName, repsorduration, amount, activityDescription) {
            const connection = await sql.connect(adminconf);
            const request = connection.request();
            request.input("UserID", sql.Int, UserID)
            request.input("ActivityName", sql.VarChar, ActivityName)
            request.input("repsorduration", sql.Int, repsorduration)
            request.input("amount", sql.Int, amount)
            request.input("activityDescription", sql.VarChar, activityDescription)
            request.input("Date", sql.Date, date.toLocaleDateString().substring(0, 10))

            return await request.query("INSERT INTO UserActivities(UserID, ActivityName, RepetitionsOrDuration, amount, activityDescription, DateCreated) VALUES (@UserID, @ActivityName, @repsorduration, @amount, @activityDescription, @Date)");
        }
        addUserActivityToDb(UserID, ActivityName, repsorduration, amount, activityDescription).then(() => {
            return res.status(200).json({
                status: "success",
                message: "User activity successfully created"
            })
        }).catch((err) => {
            console.log("BUHHHHHHHHHHHHHHHHH \n \n \n" + err)
            return res.status(500).json({
                status: "failure",
                message: "Something went wrong, try again later"
            })
        }
        )
    }
}
function createTeamActivity(req, res) {
    let date = new Date()
    console.log()
    let { TeamID, ActivityName, repsorduration, amount, activityDescription } = req.body;//many variables may be predetermined by activites we create
    //Input validation
    if (!TeamID || !ActivityName || !repsorduration || !amount) {
        return res.status(400).json({
            status: "Failure",
            message: "One or more required parameters are missing"
        })
    } else if (isNaN(TeamID)) {
        return res.status(500).json({
            status: "Failure",
            message: "The field 'TeamID' must be an integer"
        })
    } else {
        async function addTeamActivityToDb(TeamID, ActivityName, repsorduration, amount, activityDescription) {
            const connection = await sql.connect(adminconf);
            const request = connection.request();
            request.input("TeamID", sql.Int, TeamID)
            request.input("ActivityName", sql.VarChar, ActivityName)
            request.input("repsorduration", sql.Int, repsorduration)
            request.input("amount", sql.Int, amount)
            request.input("activityDescription", sql.VarChar, activityDescription)
            request.input("Date", sql.Date, date.toLocaleDateString().substring(0, 10))
            return await request.query("INSERT INTO TeamActivities(TeamID, ActivityName, RepetitionsOrDuration, amount, activityDescription, DateCreated) VALUES (@TeamID, @ActivityName, @repsorduration, @amount, @activityDescription, @Date)");
        }
        addTeamActivityToDb(TeamID, ActivityName, repsorduration, amount, activityDescription).then(() => {
            return res.status(200).json({
                status: "success",
                message: "Team activity successfully created"
            })
        }).catch((err) => {
            console.log("BUHHHHHHHHHHHHHHHHH \n \n \n" + err)
            return res.status(500).json({
                status: "failure",
                message: "Something went wrong, try again later"
            })
        }
        )
    }
}

function createCompanyActivity(req, res) {
    let date = new Date()
    
    let { CompanyID, ActivityName, repsorduration, amount, activityDescription } = req.body;//many variables may be predetermined by activites we create
    //Input validation
    if (!CompanyID || !ActivityName || !repsorduration || !amount) {
        return res.status(400).json({
            status: "Failure",
            message: "One or more required parameters are missing"
        })
    } else if (isNaN(CompanyID)) {
        return res.status(500).json({
            status: "Failure",
            message: "The field 'CompanyID' must be an integer"
        })
    } else {
        async function addCompanyActivityToDb(CompanyID, ActivityName, repsorduration, amount, activityDescription) {
            const connection = await sql.connect(adminconf);
            const request = connection.request();
            request.input("CompanyID", sql.Int, CompanyID)
            request.input("ActivityName", sql.VarChar, ActivityName)
            request.input("repsorduration", sql.Int, repsorduration)
            request.input("amount", sql.Int, amount)
            request.input("activityDescription", sql.VarChar, activityDescription)
            request.input("Date", sql.Date, date.toLocaleDateString().substring(0, 10))
            return await request.query("INSERT INTO CompanyActivities(CompanyID, ActivityName, RepetitionsOrDuration, amount, activityDescription, DateCreated) VALUES (@CompanyID, @ActivityName, @repsorduration, @amount, @activityDescription, @Date)");
        }
        addCompanyActivityToDb(CompanyID, ActivityName, repsorduration, amount, activityDescription).then(() => {
            return res.status(200).json({
                status: "success",
                message: "Company activity successfully created"
            })
        }).catch((err) => {
            console.log("BUHHHHHHHHHHHHHHHHH \n \n \n" + err)
            return res.status(500).json({
                status: "failure",
                message: "Something went wrong, try again later"
            })
        }
        )
    }
}




module.exports = {
    createUserActivity,
    createTeamActivity,
    createCompanyActivity,
    viewTopTeams,
    viewTopUsers,
    getUserActivityData,
}