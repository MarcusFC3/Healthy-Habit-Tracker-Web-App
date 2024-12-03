const express = require("express");
const activitesController = require("../controllers/activities.controller");

const activitiesRouter = express.Router();

activitiesRouter.post("/create/u",activitesController.createUserActivity)

activitiesRouter.get("/",activitesController.viewTopTeams)

module.exports = activitiesRouter;