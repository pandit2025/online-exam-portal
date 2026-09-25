var express = require("express");

var contactRouter = express.Router();

var contactController = require("../controllers/contactController");


// CREATE
contactRouter.post("/", contactController.createcontact);


// FETCH ALL
contactRouter.get("/", contactController.fetchcontact);


// SEARCH BY EMAIL
contactRouter.get("/:email", contactController.searchcontact);


// DELETE BY EMAIL
contactRouter.delete("/:email", contactController.deletecontact);


// UPDATE BY EMAIL
contactRouter.put("/:email", contactController.updatecontact);


module.exports = contactRouter;