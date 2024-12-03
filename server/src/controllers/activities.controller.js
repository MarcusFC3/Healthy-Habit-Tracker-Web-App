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


function viewTopTeams(req, res) {

    async function getTeamsData(CompanyID) {
        const connection = await sql.connect(adminconf);
        const request = connection.request();
        request.input("CompanyID", sql.Int, CompanyID);
        return await request.query("SELECT TeamID FROM Teams WHERE CompanyID = @CompanyID").then(
            async (result) => {
                const TeamID = Number(result.recordset[0]["TeamID"])
                request.input("TeamID", sql.Int, TeamID);
                return await request.query("SELECT * FROM TeamActivities WHERE TeamID = @TeamID")

            }
        )
    }
    getTeamsData(1).then((result) => {
        //console.log(JSON.stringify(result));
        let started = result.recordsets[0].length
        let completed = 0;
        for (let i = 0; i < started; i++) {
            if (result.recordsets[0][i]["completed"] === true) {
                completed++;
            }
        }
        return res.status(200).json({
            "status": "success",
            "body": {
                "started": started,
                "completed": completed
            }
        })
    })
    
}
function createUserActivity(req, res) {
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

            return await request.query("INSERT INTO UserActivities(UserID, ActivityName, RepetitionsOrDuration, amount, activityDescription) VALUES (@UserID, @ActivityName, @repsorduration, @amount, @activityDescription)");
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
    
                return await request.query("INSERT INTO TeamActivities(TeamID, ActivityName, RepetitionsOrDuration, amount, activityDescription) VALUES (@TeamID, @ActivityName, @repsorduration, @amount, @activityDescription)");
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
    
                return await request.query("INSERT INTO CompanyActivities(CompanyID, ActivityName, RepetitionsOrDuration, amount, activityDescription) VALUES (@CompanyID, @ActivityName, @repsorduration, @amount, @activityDescription)");
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
    viewTopTeams
}