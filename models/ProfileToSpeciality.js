// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const ProfileToSpeciality = sequelize.define("ProfileToSpeciality", {
    Id: {
        type: Sequelize.INTEGER
    },
    ProfileId: {
        type: Sequelize.INTEGER
    },
    SpecialityId: {
        type: Sequelize.INTEGER
    },
    AssignedBy: {
        type: Sequelize.STRING(64)
    },
    DateAssigned: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = ProfileToSpeciality;