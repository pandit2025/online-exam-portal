var testans = require("../models/testanswerSchema");


exports.fetchtestans = (req, res) => {

    testans.find()
        .then(records => {

            res.json(records);

        })
        .catch(err => {

            res.status(500).json({
                message: err.message
            });

        });

};


exports.searchtestans = (req, res) => {

    testans.find({
        email: req.params.email,
        testno: req.params.testno
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


exports.create = (req, res) => {

    testans.create(req.body)
        .then(response => {

            res.json({
                message: "Answer submitted",
                data: response
            });

        })
        .catch(err => {

            res.status(400).json({
                message: err.message
            });

        });

};