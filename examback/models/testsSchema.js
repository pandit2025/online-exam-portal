var mongoose = require("mongoose");

var testSchema = new mongoose.Schema({

    testno: {
        type: Number,
        required: true
    },

    numque: {
        type: Number,
        required: true
    },

    marks: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    }

});

var tests = mongoose.model("Test", testSchema);

module.exports = tests;