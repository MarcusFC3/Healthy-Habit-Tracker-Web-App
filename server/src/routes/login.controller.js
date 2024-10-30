const express = require("");
const bcrypt = require("bcrypt");

function signup(req, res) {
    let {username, email, password} = req.body; 
    username = username.strip();
    email = email.strip();
    password = password.strip();
    if (username === "" || email === "" || password === "") {
        res.status(400).json({
            status: "Failure",
            message: "One or more fields were empty"
        })
    }
    else {
        //check if user already exists
        //Create a new user with this data
        //log them in
    }

}

function login(req, res) {
    let {email, password} = req.body;
    
}