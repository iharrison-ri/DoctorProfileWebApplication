const express = require('express');
const router = express.Router();

// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB models
const sequelize = require("./models")

// bring in the database models
const models = require("./models/allModelExports/allModelExports");
// bring in logic
const handleDate = require("./models/util/methods").handleDate;
const getRecords = require("./models/util/methods").getRecords;
const arrayToObject = require("./models/util/methods").arrayToObject;

// CREATE a record
router.post("/addfield", (req, res) => {
    //object containing all fields of a record to be added to the DB
    const fieldsToAdd = {
        ...req.body.values
    }
    // handleDate(fieldsToAdd);
    const TableToSearch = models[req.body.field];
    TableToSearch
        .create({
        ...fieldsToAdd
    })
        .then(() => {
            res.json({created: true})
        })
        .catch(err => console.log(err));
})

// READ all in record
router.post("/allinrecord", (req, res) => {
    const TableToSearch = models[req.body.tableToSearch];
    TableToSearch
        .findAll()
        .then(recordsInTable => {
            res.json(recordsInTable)
        })
        .catch(err => console.log(err));
})

// READ all records
router.get("/allrecords", (req, res) => {
    const allRecords = [];
    const arrayOfModelKeys = Object.keys(models);
    for (let i = 0; i < arrayOfModelKeys.length; i++) {
        const modelKey = arrayOfModelKeys[i];
        const callForData = getRecords(models[modelKey]);
        allRecords.push(callForData);
    }
    Promise
        .all(allRecords)
        .then(records => {
            res.json(arrayToObject(arrayOfModelKeys, records));
        })
        .catch(err => console.log(err));
})

// UPDATE a record by id
router.post("/updaterecord", (req, res) => {
    const {id, updates, field} = req.body;
    const TableToSearch = models[field];
    TableToSearch
        .findById(id)
        .then(profile => {
            profile
                .update(updates)
                .then(() => {
                    res.json({updated: true})
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
})

// DELETE a record by id
router.delete("/deleterecord", (req, res) => {
    const {id, tableToSearch} = req.body;
    const TableToSearch = models[tableToSearch];
    TableToSearch
        .findById(id)
        .then(profile => {
            profile.destroy();
            res.json({profiledeleted: profile})
        })
        .catch(err => console.log(err));
})

module.exports = router;