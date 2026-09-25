var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({

    questionno: {
        type: Number,
        required: true
    },

    questiondet: {
        type: String,
        required: true
    },

    op1: {
        type: String,
        required: true
    },

    op2: {
        type: String,
        required: true
    },

    op3: {
        type: String,
        required: true
    },

    op4: {
        type: String,
        required: true
    },

    ans: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    }

});

var questions = mongoose.model("Question", questionSchema);

module.exports = questions;