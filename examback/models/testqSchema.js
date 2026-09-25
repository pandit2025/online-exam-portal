var mongoose = require("mongoose");

var testqSchema = new mongoose.Schema({
    testno: {
        type: Number,
        required: true
    },
    queno: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Testq", testqSchema);