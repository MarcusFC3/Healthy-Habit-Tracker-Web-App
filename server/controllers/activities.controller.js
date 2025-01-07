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
    console.log(req.user)
    console.log(JSON.stringify(process.env) + "URL")
    console.log(process.env.FIXIE_URL)
console.log(process.env.adminconfuser)
console.log(process.env["FIXIE_URL"])
    const UserActivites = []
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
            return await request.query("SELECT UserActivities.*, TeamActivities.CompanyActivityID FROM UserActivities LEFT OUTER JOIN TeamActivities ON UserActivities.TeamActivityID = TeamActivities.ActivityID WHERE UserID = @UserID")
            }
        getUserActivities(req.session.passport.user.UserID).then(async (results) => {
            async function getTeamActivityData(TeamActivityID) {
                const connection = await sql.connect(adminconf);
                const request = connection.request();
                request.input("TeamActivityID", sql.Int, TeamActivityID);
                return request.query("SELECT Completed FROM UserActivities WHERE TeamActivityID = @TeamActivityID")
            }
            async function getCompanyActivityData(CompanyActivityID) {
                const connection = await sql.connect(adminconf);
                const request = connection.request();
                request.input("CompanyActivityID", sql.Int, CompanyActivityID);
                return request.query("SELECT Completed FROM TeamActivities WHERE CompanyActivityID = @CompanyActivityID")
            }
            let activitiesArray = results.recordset;
            console.log("starting loop... and this is the result " + JSON.stringify(activitiesArray))
            
            async function loop(i, activitiesArray){
                let teamActivityID = activitiesArray[i]["TeamActivityID"]
                let companyActivityID = activitiesArray[i]["CompanyActivityID"]
                console.log("element= "+JSON.stringify(activitiesArray[i]) + "teamActivityID= " + teamActivityID + "companyActivityID= " + companyActivityID)
                if (teamActivityID != null){
                    
                    await getTeamActivityData(teamActivityID).then(
                        (results)=>{
                            let total = results.recordset.length
                            let completed = 0;

                            for (let i = 0; i < results.recordset.length; i++){
                                if (results.recordset[i]["Completed"] == 1){
                                    completed++;
                                }
                            }
                            console.log("we made it here")
                               activitiesArray[i]["TeamData"] = {
                                    UsersStarted: total,
                                    UsersCompleted: completed
                                }
                            //for loop to count total and completed
                        }
                    )
                }

                if (companyActivityID !== null){
                    await getCompanyActivityData(companyActivityID).then(
                        (results)=>{
                            let total = results.recordset.length;
                            let completed = 0;
                            for (let i = 0; i < results.recordset.length; i++){
                                if (results.recordset[i]["Completed"] == 1){
                                    completed++;
                                }
                            }
                            activitiesArray[i]["CompanyData"] = {
                                TeamsStarted: total,
                                TeamsCompleted: completed
                                
                            }
                            
                            //for loop to count total and completed
                        }
                    )
                   
                }
                console.log(activitiesArray[i])
                return activitiesArray[i]
            }
           
            for (let i = 0; i < activitiesArray.length; i++){
                console.log(await loop(i, activitiesArray))
                UserActivites.push(await loop(i, activitiesArray))
            
            };
            return res.status(200).json({
                "status": "success",
                "UserActivites": UserActivites
            })
        })
    }
}
function getTeamActivityData(req, res) {
    console.log(req.user)
    if (!req.session.passport) {
        res.status(400).json({
            status: "Failure",
            message: "You must login to view activity data"
        })
    } else{
        async function getTeamActivities(teamName, CompanyID) {
            const connection = await sql.connect(adminconf);
            const request = connection.request();
            request.input("teamName", sql.VarChar, teamName);
            request.input("companyID", sql.Int, companyID);
            return await request.query("SELECT UserActivities.*, TeamActivities.CompanyActivityID FROM UserActivities LEFT OUTER JOIN TeamActivities ON UserActivities.TeamActivityID = TeamActivities.ActivityID WHERE TeamName = @teamName AND CompanyID = @companyID")
            }
        getTeamActivities(req.user.teamName, req.user.CompanyID).then((results) => {
            return res.status(200).json({
                "status": "success",
                "UserActivites": results.recordset
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
        return await request.query("SELECT TeamName FROM Teams WHERE CompanyID = @CompanyID").then(
            async (result) => {
                let StatsByTeam = {}
                    
                    await request.query("SELECT * FROM TeamActivities WHERE CompanyID = @CompanyID").then((result) => {
                       
                        for (let i = 0;  result.recordset.length > i; i++){
                            let tname = result.recordset[i]["TeamName"]
                            StatsByTeam[tname] = {
                                Completed: 0,
                                Started: 0
                            }
                            
                        }
                        for (let i = 0;  result.recordset.length > i; i++){
                            let tname = result.recordset[i]["TeamName"]
                            if (result.recordset["Completed"]){
                                StatsByTeam[tname].Completed++;
                                StatsByTeam[tname].Started++;
                            }else {
                                StatsByTeam[tname].Started++;
                            }
                            
                            
                            
                        }
                        

                    })
                    return StatsByTeam;
                
            } 
        )
    }
    getTeamsData(req.user.CompanyID).then((StatsByTeam) => {
        console.log(StatsByTeam);
        return res.status(200).json({
            "status": "success",
            "Company": req.user.Company,
            "StatsByTeamID": StatsByTeam
        })
    })
}
}
function viewTopUsers(req, res) {
 
    async function getUsersData(CompanyID) {
        const connection = await sql.connect(adminconf);
        const request = connection.request();
        request.input("CompanyID", sql.Int, CompanyID);
        return await request.query("SELECT UserID, firstName + ' ' + lastName as FullName FROM Users WHERE TeamName in (SELECT TeamName FROM Teams Where CompanyID = @CompanyID)").then(
           
            async (result) => {
                console.log(JSON.stringify(result.recordset))
                users = result.recordset

                StatsByUser = {}
                await request.query("SELECT UA.Completed, Users.firstName + ' ' + Users.lastName as fullName FROM UserActivities as UA JOIN Users ON UA.UserID = Users.UserID WHERE CompanyID = @CompanyID").then((result) => {
                console.log("query results are:  " + JSON.stringify(result.recordset))
                
                for (let i = 0;  result.recordset.length > i; i++){
                    let fname = result.recordset[i]["fullName"]
                    StatsByUser[fname] = {
                        Completed: 0,
                        Started: 0
                    }
                    
                }
                for (let i = 0;  result.recordset.length > i; i++){
                    let fname = result.recordset[i]["fullName"]
                    if (result.recordset["Completed"]){
                        StatsByUser[fname].Completed++;
                        StatsByUser[fname].Started++;
                    }else {
                        StatsByUser[fname].Started++;
                    }
                    
                    
                    
                }
                

            })
                 
                return StatsByUser;
            }
        )
    }
    getUsersData(req.user.CompanyID).then((StatsByUser) => {
        console.log(StatsByUser);
        return res.status(200).json({
            "status": "success",
            "StatsByUser": StatsByUser,
        })
    })
    }

function createUserActivity(req, res) {
    let date = new Date() 
    let { ActivityName, repsorduration, amount, activityDescription } = req.body;//many variables may be predetermined by activites we create
    //Input validation
    if ( !ActivityName || !repsorduration || !amount) {
        return res.status(400).json({
            status: "Failure",
            message: "One or more required parameters are missing"
        })
    }else {
     
        async function addUserActivityToDb(UserID, ActivityName, repsorduration, amount, activityDescription) {
            const connection = await sql.connect(adminconf);
            const request = connection.request();
            request.input("UserID", sql.Int, UserID)
            request.input("ActivityName", sql.VarChar, ActivityName)
            request.input("repsorduration", sql.Int, repsorduration)
            request.input("amount", sql.Int, amount)
            request.input("activityDescription", sql.VarChar, activityDescription)
            console.log(date.toLocaleDateString() +" "+ date.toLocaleTimeString("en-US",{hour12: false}))
            request.input("Date", sql.DateTime, date)

            return await request.query("INSERT INTO UserActivities(UserID, ActivityName, RepetitionsOrDuration, amount, activityDescription, DateCreated) VALUES (@UserID, @ActivityName, @repsorduration, @amount, @activityDescription, @Date)");
        }
        addUserActivityToDb(req.session.passport.user.UserID, ActivityName, repsorduration, amount, activityDescription).then(() => {
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
    let {ActivityName, repsorduration, amount, activityDescription } = req.body;//many variables may be predetermined by activites we create
    //Input validation
    if ( !ActivityName || !repsorduration || !amount) {
        return res.status(400).json({
            status: "Failure",
            message: "One or more required parameters are missing"
        })
    }
     else {
        async function addTeamActivityToDb(TeamName, CompanyID, ActivityName, repsorduration, amount, activityDescription) {
            const connection = await sql.connect(adminconf);
            const request = connection.request();
            request.input("CompanyID", sql.Int, CompanyID)
            request.input("TeamName", sql.VarChar,TeamName)
            request.input("ActivityName", sql.VarChar, ActivityName)
            request.input("repsorduration", sql.Int, repsorduration)
            request.input("amount", sql.Int, amount)
            request.input("activityDescription", sql.VarChar, activityDescription)
            request.input("Date", sql.DateTime, date)
            return await request.query("INSERT INTO TeamActivities(TeamName,CompanyID, ActivityName, RepetitionsOrDuration, amount, activityDescription, DateCreated) VALUES (@TeamName,@CompanyID, @ActivityName, @repsorduration, @amount, @activityDescription, @Date)");
        }
        addTeamActivityToDb(req.user.TeamName,req.user.CompanyID, ActivityName, repsorduration, amount, activityDescription).then((result) => {
            console.log(JSON.stringify(result))
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
    
    let {ActivityName, repsorduration, amount, activityDescription } = req.body;//many variables may be predetermined by activites we create
    //Input validation
    if ( !ActivityName || !repsorduration || !amount) {
        return res.status(400).json({
            status: "Failure",
            message: "One or more required parameters are missing"
        })
    }  else {
        async function addCompanyActivityToDb(CompanyID, ActivityName, repsorduration, amount, activityDescription) {
            const connection = await sql.connect(adminconf);
            const request = connection.request();
            console.log(CompanyID)
            request.input("CompanyID", sql.Int, CompanyID)
            request.input("ActivityName", sql.VarChar, ActivityName)
            request.input("repsorduration", sql.Int, repsorduration)
            request.input("amount", sql.Int, amount)
            request.input("activityDescription", sql.VarChar, activityDescription)
            request.input("Date", sql.DateTime, date)
            return await request.query("INSERT INTO CompanyActivities(CompanyID, ActivityName, RepetitionsOrDuration, amount, activityDescription, DateCreated) VALUES (@CompanyID, @ActivityName, @repsorduration, @amount, @activityDescription, @Date)");
        }
        console.log(req.user.CompanyID)
        addCompanyActivityToDb(req.user.CompanyID, ActivityName, repsorduration, amount, activityDescription).then(() => {
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

function removeCompanyActivity(req, res){
      let time = req.body.time 
    let date = new Date(time)
    //chage date to datetime in activities in azure
     async function deleteTeamActivity(CompanyID, time){
        const connection = sql.connect(adminconf);
        const transaction = new sql.transaction(connection)
        const request = transaction.request();
        transaction.begin()
        let companyActivityID;
        let teamActivityID;
        try{
            
        request.input("time",sql.DateTime,time)
        request.input("companyID",sql.Int,companyID)
        await request.query("SELECT ActivityID FROM CompanyActivities WHERE DateCreated = @time AND CompanyID = @companyID").then((result)=>{
           companyActivitiyID = result.recordset[0]["ActivityID"]
        })
        request.input("companyActivityID", sql.Int, companyActivityID);
            
         await request.query("SELECT ActivityID FROM TeamActivities WHERE CompanyActivityID = @companyActivityID").then((result)=>{
           teamActivitiyID = result.recordset[0]["ActivityID"]
        })
        request.input("teamActivityID", sql.Int, teamActivityID);
        await request.query("DELETE TeamActivities WHERE CompanyActivityID = @companyActivityID")
        await request.query("DELETE UserActivites WHERE TeamActivityID = @teamActivityID")
        transaction.commit();
        return "success!"
        }
        catch (e){
            transaction.rollback();
            return e;
        }
    }
}
function removeTeamActvitiy(req, res){
    let time = req.body.time 
    let date = new Date(time)
    //chage date to datetime in activities in azure
    async function deleteTeamActivity(teamName,CompanyID, time){
        const connection = sql.connect(adminconf);
        const transaction = new sql.transaction(connection)
        const request = transaction.request();
        transaction.begin()
        let activityID;
        try{
            
        request.input("teamName",sql.VarChar,teamName)
        request.input("time",sql.DateTime,time)
        request.input("companyID",sql.Int,companyID)
        await request.query("SELECT ActivityID FROM TeamActivities WHERE DateCreated = @time AND TeamName = @teamName AND CompanyID = @companyID").then((result)=>{
           activitiyID = result.recordset[0]["ActivityID"]
        })
        request.input("activityID", sql.Int, activityID);
        await request.query("DELETE TeamActivities WHERE ActivityID = @activityID")
        await request.query("DELETE UserActivites WHERE TeamActivityID = @activityID")
        transaction.commit();
        return "success!"
        }
        catch (e){
            transaction.rollback();
            return e;
        }
    }
    deleteTeamActivity(req.User.TeamName, req.User.CompanyID, time)
}
function removeUserActivity(req,res){
    let time = req.body.time 
    let date = new Date(time)
    //chage date to datetime in activities in azure
    async function deleteUserActivity(userID, time){
        const connection = sql.connect(adminconf);
        const request = connection.request();
        request.input("userID",sql.Int,userID)
        request.input("time",sql.Int,time)
        return await request.query("DELETE UserActivities WHERE UserID = @userID AND DateCreated = @time")
    }
    
}
function deincrementAmount(req,res){
    let time = req.body.time
    let amount = req.body.amount
    let date = new Date(time)
    //chage date to datetime in activities in azure
    async function deleteUserActivity(userID, time, amount){
        const connection = sql.connect(adminconf);
        const request = connection.request();
        request.input("userID",sql.Int,userID)
        request.input("time",sql.Int,time)
        request.input("amount", sql.Int,amount)
        return await request.query("UPDATE UserActivities SET Amount = @amount WHERE UserID = @userID AND DateCreated = @time")
    }
}
function setCompleted(req, res){
    let time = req.body.time 
    let date = new Date(time)
    async function deleteUserActivity(userID, time, amount){
        const connection = sql.connect(adminconf);
        const request = connection.request();
        request.input("userID",sql.Int,userID)
        request.input("time",sql.Int,time)
        request.input("amount", sql.Int,amount)
        return await request.query("UPDATE UserActivities SET Completed = 1 WHERE UserID = @userID AND DateCreated = @time")
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
