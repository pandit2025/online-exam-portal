var mongoose = require("mongoose");
var dotenv = require("dotenv");

dotenv.config();

console.log("DBURL EXISTS:", !!process.env.DBURL);

mongoose.connect(process.env.DBURL, {
    serverSelectionTimeoutMS: 10000
})
.then(() => {
    console.log("CONNECTED TO ATLAS DATABASE");
})
.catch((err) => {
    console.log("DATABASE CONNECTION ERROR:");
    console.log(err);
});

module.exports = mongoose.connection;