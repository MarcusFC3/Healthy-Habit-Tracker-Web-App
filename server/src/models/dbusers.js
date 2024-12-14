"use strict"

const servadminconf = {
    server: "healthyhabittracker.database.windows.net",
        user: "serveradmin",
        password: "HmCBVzQ5w~fY5hL",//Do NOT hard code this value
        database: "SimplyHealth",

        options: { 
            encrypt: true, 
            trustServerCertificate: true
        }
}




module.exports = {
    adminconf : servadminconf,
};