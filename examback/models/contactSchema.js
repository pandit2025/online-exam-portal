var mongoose = require("mongoose");
var validator = require("validator");

var contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        validate: {
            validator: (val) => {
                return validator.isAlpha(val.replace(/\s/g, ""));
            },
            message: "Name can contain only alphabets"
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

    contact: {
        type: String,
        required: true,
        validate: {
            validator: (val) => {
                return /^[6-9][0-9]{9}$/.test(val);
            },
            message: "Mobile No must be valid"
        }
    },

    message: {
        type: String,
        required: true
    }

});

var contacts = mongoose.model("Contact", contactSchema);

module.exports = contacts;