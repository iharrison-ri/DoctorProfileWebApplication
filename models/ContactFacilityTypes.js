// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const ContactFacilityTypes = sequelize.define("ContactFacilityTypes", {
    ContactInfoId: {
        type: Sequelize.INTEGER
    },
    FaciltyName: {
        type: Sequelize.STRING(64)
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = ContactFacilityTypes;