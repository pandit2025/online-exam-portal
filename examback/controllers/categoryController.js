var categories = require("../models/categorySchema");


// ADD CATEGORY
exports.createcategory = (req, res) => {

    categories.insertOne(req.body)
        .then(response => {

            res.json({
                message: "Category Saved Successfully"
            });

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });
};


// GET ALL CATEGORIES
exports.fetchcategory = (req, res) => {

    categories.find()
        .then(records => {

            res.json(records);

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });
};


// DELETE CATEGORY
exports.deletecategory = (req, res) => {

    categories.deleteOne({
        catno: req.params.catno
    })
        .then(response => {

            res.json({
                message: "Category Deleted"
            });

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });
};


// UPDATE CATEGORY
exports.updatecategory = (req, res) => {

    categories.updateOne(
        {
            catno: req.params.catno
        },
        {
            $set: {
                catname: req.body.catname
            }
        }
    )
        .then(response => {

            res.json({
                message: "Category Updated"
            });

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });
};