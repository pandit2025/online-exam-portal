var mongoose = require("mongoose");
var validator = require("validator");

var registerSchema = new mongoose.Schema({

    firstname: {

        type: String,
        required: true,

        validate: {
            validator: (val) => {
                return validator.isAlpha(val);
            },

            message: "Firstname can contain only alphabets"
        }

    },

    lastname: {

        type: String,
        required: true,

        validate: {
            validator: (val) => {
                return validator.isAlpha(val);
            },

            message: "Lastname can contain only alphabets"
        }

    },

    email: {

        type: String,
        required: true,

        validate: {
            validator: (val) => {
                return validator.isEmail(val);
            },

            message: "Email must be valid"
        }

    },

    password: {

        type: String,
        required: true,

        validate: {
            validator: (val) => {
                return validator.isStrongPassword(val);
            },

            message: "Password should contain uppercase, lowercase, number and special character"
        }

    }

});

var registers = mongoose.model("Register", registerSchema);

module.exports = registers;