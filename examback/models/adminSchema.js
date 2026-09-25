var mongoose = require("mongoose")
var validator = require ("validator")
var adminSchema = new mongoose.Schema({

    email: {
        type:String,
        required:true,
        validate: {
            validator:(val)=>{
                return validator.isEmail(val)
            },
            message: 'Email must be valid'
        }
    },
    password: {
        type:String,
        required : true,
        validate: {
            validator: (val)=>{
                return validator.isStrongPassword(val)
            },
            message: 'Password should be valid'
        }
    },
})
var admins = mongoose.model("Admin", adminSchema)
module.exports = admins