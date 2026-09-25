var mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({

    catno: {
        type: Number,
        required: true
    },

    catname: {
        type: String,
        required: true
    }

});

var category = mongoose.model("Category", categorySchema);

module.exports = category;