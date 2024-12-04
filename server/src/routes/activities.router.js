const express = require("express");
const activitesController = require("../controllers/activities.controller");

const activitiesRouter = express.Router();

activitiesRouter.post("/create/u",activitesController.createUserActivity)

activitiesRouter.post("/create/t", activitesController.createTeamActivity)

activitiesRouter.get("/",activitesController.viewTopTeams)
activitiesRouter.get("/u",activitesController.viewTopUsers)
activitiesRouter.get("/user", activitesController.getUserActivityData)


module.exports = activitiesRouter;