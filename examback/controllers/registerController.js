console.log("REGISTER CONTROLLER LOADED");
var registers = require("../models/registerSchema");


// =========================
// CREATE REGISTER
// =========================

exports.createregister = (req, res) => {

    console.log("REGISTER API CALLED");
    console.log("REGISTER DATA:", req.body);

    registers.insertOne(req.body)
        .then(response => {

            res.json({
                message: "Register Successfully"
            });

        })
        .catch(err => {

            res.status(400).json({
                message: err.message
            });

        });
};

// =========================
// FETCH ALL REGISTER USERS
// =========================

exports.fetchregister = (req, res) => {

    registers.find()

        .then(records => {

            res.json(records);

        })

        .catch(err => {

            res.status(500).json({
                message: err.message
            });

        });

};


// =========================
// SEARCH REGISTER BY EMAIL
// =========================

exports.searchregister = (req, res) => {

    registers.find({
        email: req.params.email
    })

        .then(records => {

            res.json(records);

        })

        .catch(err => {

            res.status(500).json({
                message: err.message
            });

        });

};


// =========================
// DELETE REGISTER BY EMAIL
// =========================

exports.deleteregister = (req, res) => {

    registers.deleteOne({
        email: req.params.email
    })

        .then(response => {

            res.json({
                message: "Register Deleted"
            });

        })

        .catch(err => {

            res.status(500).json({
                message: err.message
            });

        });

};


// =========================
// UPDATE REGISTER BY EMAIL
// =========================

exports.updateregister = (req, res) => {

    registers.updateOne(

        {
            email: req.params.email
        },

        {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password
            }
        }

    )

        .then(response => {

            res.json({
                message: "Register Updated"
            });

        })

        .catch(err => {

            res.status(500).json({
                message: err.message
            });

        });

};


// =========================
// LOGIN
// =========================

exports.login = (req, res) => {

    registers.find({

        email: req.params.email,
        password: req.params.password

    })

        .then(records => {

            res.json(records);

        })

        .catch(err => {

            res.status(500).json({
                message: err.message
            });

        });

};