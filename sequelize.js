const express = require('express');
const router = express.Router();

// bring in the sequilize object
const Sequelize = require('sequelize');
// bring in the configuration
const config = require('./config/config').db;
// export an instance of the Sequelize object
const sequelize = new Sequelize(config)
// test the connection to the database
sequelize.authenticate()
    .then(() => console.log('connected to the database!!'))
    .catch(error => console.log(error));

// define a model
const DB = sequelize.define("TestingPatientAccess", {
    name: { type: Sequelize.STRING },
    idField: { type: Sequelize.INTEGER }
})

// CREATE a profile
router.post("/addprofile", (req, res) => {
    const profile = {
        name: req.body.name,
        idField: req.body.idField
    }
    DB.create(profile).then(() => {
        res.json({ profilecreated: true })
    }).catch(err => console.log(err));
})

// READ all profiles
router.get("/allprofiles", (req, res) => {
    DB.findAll().then(profiles => {
        res.json(profiles)
    }).catch(err => console.log(err));
})

// UPDATE a profile by id
router.post("/updateprofile", (req, res) => {
    const id = req.body.id;
    const updates = req.body.updates;
    DB.findById(id).then(profile => {
        profile.update(updates).then(() => {
            res.json({ updated: true })
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
})

// DELETE a profile by id
router.delete("/deleteprofile", (req, res) => {
    const id = req.body.id;
    DB.findById(id).then(profile => {
        console.log(profile)
        profile.destroy();
        res.json({ profiledeleted: profile })
    }).catch(err => console.log(err));
})

module.exports = router;