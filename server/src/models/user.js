const servadminconf = {
    server: "localhost\\SQLEXPRESSBPA",
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