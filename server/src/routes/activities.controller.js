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



function createUserActivity(req, res) {
    let { UserID, ActivityName, repsorduration, amount, activityDescription } = req.body;//many variables may be predetermined by activites we create
    //Input validation
    if(!UserID || !ActivityName || !repsorduration || !amount){
        return res.status(400).json({
            status: "Failure",
            message: "One or more required parameters are missing"
        })
    } else if(isNaN(UserID)){
        return res.status(500).json({
            status: "Failure",
            message: "The field 'UserID' must be an integer"
        })
    } else{
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
        }).catch((err) =>{
            console.log("BUHHHHHHHHHHHHHHHHH \n \n \n" +err)
            return res.status(500).json({
                status: "failure",
                message: "Something went wrong, try again later"
            })}
        )
    }
}
function createTeamActivity(req, res) {

}
function createCompanyActivity(req, res) {

}



module.exports = {
    createUserActivity,
    createTeamActivity,
    createCompanyActivity,
}