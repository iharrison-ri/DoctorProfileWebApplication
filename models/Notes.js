// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const Notes = sequelize.define("Notes", {
    Id: {
        type: Sequelize.INTEGER
    },
    Notes: {
        type: Sequelize.STRING(1000)
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Notes;