var express = require("express");

var questionRouter = express.Router();

var questionController = require("../controllers/questionController");


// ADD QUESTION
questionRouter.post("/", questionController.createquestion);


// GET ALL QUESTIONS
questionRouter.get("/", questionController.fetchquestion);


// SEARCH QUESTION
questionRouter.get("/:questionno", questionController.searchquestion);


// DELETE QUESTION
questionRouter.delete("/:questionno", questionController.deletequestion);


// UPDATE QUESTION
questionRouter.put("/:questionno", questionController.updatequestion);


module.exports = questionRouter;