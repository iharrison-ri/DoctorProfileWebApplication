// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const ExpertiseTypes = sequelize.define("ExpertiseTypes", {
    Id: {
        type: Sequelize.INTEGER
    },
    ExpertiseTypes: {
        type: Sequelize.STRING(64)
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = ExpertiseTypes;