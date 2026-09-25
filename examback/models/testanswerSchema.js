var mongoose = require("mongoose");
var validator = require("validator");

var testanswerSchema = new mongoose.Schema({

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

    queno: {
        type: Number,
        required: true
    },

    ansgiven: {
        type: String,
        required: true
    }

});

var testanswers = mongoose.model("Testanswer", testanswerSchema);

module.exports = testanswers;