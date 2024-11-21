"use strict"

const servadminconf = {
    server: "10.44.142.88\\SQLEXPRESSBPA",
        user: "serveradministrator",
        password: "admin",
        database: "SimplyHealth",
 
        options: { 
            encrypt: true, 
            trustServerCertificate: true
        }
}




module.exports = {
    adminconf : servadminconf,
};