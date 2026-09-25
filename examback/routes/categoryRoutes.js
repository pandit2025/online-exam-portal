var express = require("express");

var categoryRouter = express.Router();

var categoryController = require("../controllers/categoryController");


// ADD CATEGORY
categoryRouter.post("/", categoryController.createcategory);


// GET ALL CATEGORIES
categoryRouter.get("/", categoryController.fetchcategory);


// DELETE CATEGORY
categoryRouter.delete("/:catno", categoryController.deletecategory);


// UPDATE CATEGORY
categoryRouter.put("/:catno", categoryController.updatecategory);


module.exports = categoryRouter;