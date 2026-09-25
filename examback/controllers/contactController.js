var contacts = require("../models/contactSchema");


// CREATE CONTACT
exports.createcontact = (req, res) => {

    contacts.insertOne(req.body)
        .then(response => {

            res.json({
                message: "Contact Saved Successfully"
            });

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });
};


// FETCH ALL CONTACTS
exports.fetchcontact = (req, res) => {

    contacts.find()
        .then(records => {

            res.json(records);

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });
};


// SEARCH CONTACT BY EMAIL
exports.searchcontact = (req, res) => {

    contacts.find({
        email: req.params.email
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


// DELETE CONTACT BY EMAIL
exports.deletecontact = (req, res) => {

    contacts.deleteOne({
        email: req.params.email
    })
        .then(response => {

            res.json({
                message: "Contact Deleted"
            });

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });
};


// UPDATE CONTACT BY EMAIL
exports.updatecontact = (req, res) => {

    contacts.updateOne(
        {
            email: req.params.email
        },
        {
            $set: req.body
        }
    )
        .then(response => {

            res.json({
                message: "Contact Updated Successfully"
            });

        })
        .catch(err => {

            res.json({
                message: err.message
            });

        });
};