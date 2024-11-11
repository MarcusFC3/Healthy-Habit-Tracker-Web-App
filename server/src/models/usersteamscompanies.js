const express = require("express");
const bcrypt = require("bcrypt");
const sql = require("mssql");
const { adminconf } = require("./models/dbusers");
const { response } = require("../app");

async function getTeamIDFromName(teamName){
    const connectionPool = await sql.connect(adminconf);
    let request = await connectionPool.request();
    request = await request.input("teamName", sql.VarChar, `${teamName}`);
    return await request.query("SELECT TeamID FROM Teams WHERE TeamName = @teamName")
}
async function getUsersFromTeamID(teamID){
    const connectionPool = await sql.connect(adminconf);
    let request = await connectionPool.request();
    request = await request.input("TeamID", sql.Int, `${teamID}`);
    return await request.query("SELECT firstName + lastName as Name, Username FROM Users WHERE TeamID = @TeamID")
}

function getUsersFromTeam(teamName){
    getTeamIDFromName(teamName).then((response => {
        if (!response.recordset[0]){
            return "teamNotFound"
        }
        else{
            let teamID = response.recordset[0].TeamID
            return getUsersFromTeamID(teamID).then(response => {//add await 
                if (!response.recordset[0]){
                    return "teamNotFound"
                } else{
                    return response.recordset
                }
            })
        }
    }))
}

async function getCompanyIDFromName(companyName){
    const connectionPool = await sql.connect(adminconf);
    let request = await connectionPool.request();
    request = await request.input("companyName", sql.VarChar, `${companyName}`);
    return await request.query("SELECT CompanyID FROM Companies WHERE CompanyName = @companyName")
}
async function getTeamsFromCompanyID(CompanyID){
    const connectionPool = await sql.connect(adminconf);
    let request = await connectionPool.request();
    request = await request.input("CompanyID", sql.Int, `${CompanyID}`);
    return await request.query("SELECT TeamName FROM Teams WHERE CompanyID = @CompanyID")
}

function getTeamsFromCompany(CompanyName){

}