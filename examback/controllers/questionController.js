var questions = require("../models/questionSchema");


// CREATE QUESTION
exports.createquestion = (req, res) => {

    questions.insertOne(req.body)
        .then(response => {

            res.json({
                message: "Question Added Successfully"
            });

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });

};


// FETCH ALL QUESTIONS
exports.fetchquestion = (req, res) => {

    questions.find()
        .then(records => {

            res.json(records);

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });

};


// SEARCH QUESTION BY QUESTION NUMBER
exports.searchquestion = (req, res) => {

    questions.find({
        questionno: req.params.questionno
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


// DELETE QUESTION
exports.deletequestion = (req, res) => {

    questions.deleteOne({
        questionno: req.params.questionno
    })
        .then(response => {

            res.json({
                message: "Question Deleted"
            });

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });

};


// UPDATE QUESTION
exports.updatequestion = (req, res) => {

    questions.updateOne(
        {
            questionno: req.params.questionno
        },
        {
            $set: {
                questiondet: req.body.questiondet,
                op1: req.body.op1,
                op2: req.body.op2,
                op3: req.body.op3,
                op4: req.body.op4,
                ans: req.body.ans,
                category: req.body.category
            }
        }
    )
        .then(response => {

            res.json({
                message: "Question Updated"
            });

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });

};