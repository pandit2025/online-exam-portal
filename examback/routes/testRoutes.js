var express = require("express");

var testRouter = express.Router();

var testController = require("../controllers/testController");


// CREATE TEST
testRouter.post("/", testController.createtests);


// GET ALL TESTS
testRouter.get("/", testController.fetchtests);


// SEARCH TEST
testRouter.get("/:testno", testController.searchtests);


// DELETE TEST
testRouter.delete("/:testno", testController.deletetests);


// UPDATE TEST
testRouter.put("/:testno", testController.updatetests);


module.exports = testRouter;