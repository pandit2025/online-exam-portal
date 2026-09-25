var tests = require("../models/testsSchema");


// CREATE TEST
exports.createtests = (req, res) => {

    tests.insertOne(req.body)
        .then(response => {

            res.json({
                message: "Test Created Successfully"
            });

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });

};


// FETCH ALL TESTS
exports.fetchtests = (req, res) => {

    tests.find()
        .then(records => {

            res.json(records);

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });

};


// SEARCH TEST BY TEST NUMBER
exports.searchtests = (req, res) => {

    tests.find({
        testno: req.params.testno
    })
        .then(records => {

            res.json(records);

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });

};


// DELETE TEST
exports.deletetests = (req, res) => {

    tests.deleteOne({
        testno: req.params.testno
    })
        .then(response => {

            res.json({
                message: "Test Deleted"
            });

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });

};


// UPDATE TEST
exports.updatetests = (req, res) => {

    tests.updateOne(
        {
            testno: req.params.testno
        },
        {
            $set: {
                numque: req.body.numque,
                marks: req.body.marks,
                category: req.body.category
            }
        }
    )
        .then(response => {

            res.json({
                message: "Test Updated"
            });

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });

};