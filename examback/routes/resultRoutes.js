var express = require("express");

var resultRouter = express.Router();

const resultController = require("../controllers/resultController");

resultRouter.post("/", resultController.createresult);

resultRouter.get("/", resultController.fetchresult);

resultRouter.get("/:email", resultController.searchresult);

resultRouter.delete("/:email", resultController.deleteresult);

resultRouter.put("/:email", resultController.updateresult);

module.exports = resultRouter;