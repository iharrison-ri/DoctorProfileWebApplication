// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const ContactTypes = sequelize.define("ContactTypes", {
    Id: {
        type: Sequelize.INTEGER
    },
    ContactTypeDescription: {
        type: Sequelize.STRING(64)
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = ContactTypes;