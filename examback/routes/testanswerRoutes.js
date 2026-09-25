var express = require("express");

const testanswerController = require("../controllers/testanswerController");

var testanswerRouter = express.Router();


testanswerRouter.post(
    "/",
    testanswerController.create
);


testanswerRouter.get(
    "/",
    testanswerController.fetchtestans
);


testanswerRouter.get(
    "/:email/:testno",
    testanswerController.searchtestans
);


module.exports = testanswerRouter;