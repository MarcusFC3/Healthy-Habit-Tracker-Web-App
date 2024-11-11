const express = require("express");
const activitesController = require("./activities.controller");

const activitiesRouter = express.Router();

activitiesRouter.post("/create/u",activitesController.createUserActivity)

activitiesRouter.get("/",(req, res) => {})

module.exports = activitiesRouter;