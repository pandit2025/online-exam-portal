var mongoose = require("mongoose");
var validator = require("validator");

var resultSchema = new mongoose.Schema({
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

    testno: {
        type: Number,
        required: true
    },

    totalmarks: {
        type: Number,
        required: true
    },

    obtainedmarks: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    }
});

var results = mongoose.model("Result", resultSchema);

module.exports = results;