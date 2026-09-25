var express = require("express");

var registerRouter = express.Router();

const registerController = require("../controllers/registerController");

// CREATE REGISTER
registerRouter.post(
    "/",
    registerController.createregister
);

// FETCH ALL REGISTER USERS
registerRouter.get(
    "/",
    registerController.fetchregister
);

// SEARCH REGISTER BY EMAIL
registerRouter.get(
    "/:email",
    registerController.searchregister
);

// DELETE REGISTER BY EMAIL
registerRouter.delete(
    "/:email",
    registerController.deleteregister
);

// UPDATE REGISTER BY EMAIL
registerRouter.put(
    "/:email",
    registerController.updateregister
);

// LOGIN
registerRouter.get(
    "/login/:email/:password",
    registerController.login
);

module.exports = registerRouter;