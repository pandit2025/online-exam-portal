var express =require("express")
var adminRouter=express.Router()
var adminController=require("../controllers/adminloginController") 
adminRouter.get("/:email/:password",adminController.login)

module.exports=adminRouter