// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const Institutions = sequelize.define("Institutions", {
    Id: {
        type: Sequelize.INTEGER
    },
    InstitutionName: {
        type: Sequelize.STRING(64)
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Institutions;