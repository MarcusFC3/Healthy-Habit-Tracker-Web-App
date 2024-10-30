const express = require("");
const bcrypt = require("bcrypt");

function signup(req, res) {
    let {fullName,username, email, password} = req.body; 
    username = username.strip();
    email = email.strip();
    password = password.strip();
    if (fullName === "" || username === "" || email === "" || password === "") {
        return res.status(400).json({
            status: "Failure",
            message: "One or more fields were empty"
        })
    }else if (!/^[a-z0-9]+$/i.test(username)){
        return res.status(400).json({
            status: "Failure",
            message: "Username must only contain alphanumeric characters"
        })
    } else if (!/^[a-z]/i.test(fullName)){
        return res.status(400).json({
            status: "Failure",
            message: "Name must only contain alphabectic characters"
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