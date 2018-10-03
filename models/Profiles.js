// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const Profiles = sequelize.define("Profiles", {
    Id: {
        type: Sequelize.INTEGER
    },
    FirstName: {
        type: Sequelize.STRING(150)
    },
    LastName: {
        type: Sequelize.STRING(150)
    },
    NPI: {
        type: Sequelize.INTEGER
    },
    DOB: {
        type: Sequelize.DATE
    },
    SysId: {
        type: Sequelize.STRING(50)
    },
    ImageLocation: {
        type: Sequelize.STRING(128)
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Profiles;