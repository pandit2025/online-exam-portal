var mongoose= require("mongoose")
var dotenv = require("dotenv")
dotenv.config()

var cn = mongoose.connect(process.env.DBURL).then(res=>{
    console.log("connected to database")
}).catch(err => {
    console.log(err)
})
module.exports = cn
 