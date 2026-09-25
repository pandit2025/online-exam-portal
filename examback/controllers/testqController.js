var testq = require("../models/testqSchema")

exports.createtestq = (req,res) =>{
    testq.create(req.body).then(response =>{
        res.json({ message: "Test Questions added successfully"})
    }).catch(err =>{
        res.json({ message: err })
    })
}

exports.fetchtestq = (req,res) =>{
    testq.find().then(records =>{
        res.json(records)
    })
}

exports.searchtestq = (req,res) =>{
    testq.find({ testno: req.params.testno }).then(records =>{
        res.json(records)
    })
}

exports.deletetestq = (req,res) =>{
    testq.deleteOne({ testno: req.params.testno }).then(response =>{
        res.json({ message: "Test Question Deleted"})
    })
}

exports.updatetestq = (req,res) =>{
    testq.updateOne(
        { testno: req.params.testno },
        { $set: { queno: req.body.queno, testno: req.body.testno }}
    ).then(response =>{
        res.json({ message: "Test Question Updated"})
    })
}