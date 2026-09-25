var result = require("../models/resultSchema");

// CREATE RESULT
exports.createresult = (req, res) => {
    result.create(req.body)
        .then(response => {
            res.json({
                message: "Result created successfully",
                data: response
            });
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });
};


// FETCH ALL RESULTS
exports.fetchresult = (req, res) => {
    result.find()
        .then(records => {
            res.json(records);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};


// SEARCH RESULT BY EMAIL
exports.searchresult = (req, res) => {
    result.find({
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


// DELETE SPECIFIC RESULT BY ID
exports.deleteresult = (req, res) => {

    result.deleteOne({
        _id: req.params.id
    })
        .then(response => {

            if (response.deletedCount === 0) {
                return res.status(404).json({
                    message: "Result not found"
                });
            }

            res.json({
                message: "Result deleted successfully"
            });

        })
        .catch(err => {

            res.status(500).json({
                message: err.message
            });

        });
};


// UPDATE RESULT
exports.updateresult = (req, res) => {

    result.updateOne(
        {
            _id: req.params.id
        },
        {
            $set: {
                testno: req.body.testno,
                totalmarks: req.body.totalmarks,
                obtainedmarks: req.body.obtainedmarks,
                status: req.body.status
            }
        }
    )
        .then(response => {

            res.json({
                message: "Result Updated"
            });

        })
        .catch(err => {

            res.status(500).json({
                message: err.message
            });

        });
};