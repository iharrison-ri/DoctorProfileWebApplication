// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const Speciality = sequelize.define("Speciality", {
    Id: {
        type: Sequelize.INTEGER
    },
    Name: {
        type: Sequelize.STRING(150)
    },
    Status: {
        type: Sequelize.STRING(25)
    },
    SpecialityOrder: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Speciality;