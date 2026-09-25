var admins = require("../models/adminSchema")

    exports.login = (req,res) =>{
    admins.find({ email:req.params.email,password:req.params.password}).then(records =>{
        res.json(records)
    })
}