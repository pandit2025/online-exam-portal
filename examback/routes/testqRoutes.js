var express = require("express")
var testqRouter = express.Router()
const testqController = require("../controllers/testqController")

testqRouter.post("/", testqController.createtestq)
testqRouter.get("/", testqController.fetchtestq)
testqRouter.get("/:testno", testqController.searchtestq)
testqRouter.delete("/:testno", testqController.deletetestq)

module.exports = testqRouter