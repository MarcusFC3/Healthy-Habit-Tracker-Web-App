const express = require("express");

const userRouter = express.Router();

userRouter.get("/data", function(req, res){
    return res.status(200).json(req.session.passport.user);
})

module.exports= userRouter
