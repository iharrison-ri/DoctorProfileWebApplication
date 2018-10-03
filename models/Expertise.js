// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const Expertise = sequelize.define("Expertise", {
    Id: {
        type: Sequelize.INTEGER
    },
    Name: {
        type: Sequelize.STRING(150)
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Expertise;