const express = require('express');
const router = express.Router();

// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB models
const sequelize = require("./models")

// bring in the database models
const models = {
    Affiliates: require("./models/Affiliates"),
    ContactTypes: require("./models/ContactTypes"),
    ContactInfo: require("./models/ContactInfo"),
    Institutions: require("./models/Institutions"),
    Credentials: require("./models/Credentials"),
    Expertise: require("./models/Expertise"),
    ExpertiseTypes: require("./models/ExpertiseTypes"),
    Notes: require("./models/Notes"),
    Profiles: require("./models/Profiles"),
    ProfileToAffiliates: require("./models/ProfileToAffiliates"),
    ProfileToContactInfo: require("./models/ProfileToContactInfo"),
    ProfileToCredentials: require("./models/ProfileToCredentials"),
    ProfileToExpertise: require("./models/ProfileToExpertise"),
    ProfileToNotes: require("./models/ProfileToNotes"),
    ProfileToRestrictions: require("./models/ProfileToRestrictions"),
    ProfileToSpeciality: require("./models/ProfileToSpeciality"),
    Restrictions: require("./models/Restrictions"),
    Speciality: require("./models/Speciality")
}

// bring in all model references
const myModelRefs = require("./models/modelFieldRef/models");

const handleDate = (fieldsToAdd) => {
    const dateProperties = ["EffectiveDate", "TermDate"];
    dateProperties.map(data => {
        if (fieldsToAdd.hasOwnProperty(data)) {
            fieldsToAdd[data] = Date.now();
        }
    })
}

// CREATE a record
router.post("/addfield", (req, res) => {
    const fieldsToAdd = {
        ...req.body.values
    }
    handleDate(fieldsToAdd);
    const Field = models[req.body.field];
    Field
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
    const Field = models[req.body.field];
    Field
        .findAll()
        .then(profiles => {
            res.json(profiles)
        })
        .catch(err => console.log(err));
})

const getRecords = (table) => {
    return table.findAll();
}

const arrayToObject = (objectKeys, arr) => {
    const obj = {};
    arr.forEach((data, index) => {
        obj[objectKeys[index]] = data;
    })
    return obj;
}

// READ all records
router.get("/allrecords", (req, res) => {
    const allRecords = [];
    const modelsArr = Object.keys(models);
    for(let i = 0; i < modelsArr.length; i++){
        allRecords.push(getRecords(models[modelsArr[i]]));
    }
    Promise.all(allRecords).then(records => {
        res.send(arrayToObject(modelsArr, records))
    })
})

// UPDATE a record by id
router.post("/updaterecord", (req, res) => {
    const id = req.body.id;
    const updates = req.body.updates;
    const Field = models[req.body.field];
    Field
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
    const id = req.body.id;
    const Field = models[req.body.field];
    Field
        .findById(id)
        .then(profile => {
            profile.destroy();
            res.json({profiledeleted: profile})
        })
        .catch(err => console.log(err));
})

module.exports = router;