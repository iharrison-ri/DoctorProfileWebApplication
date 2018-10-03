// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const ProfileToAffiliates = sequelize.define("ProfileToAffiliates", {
    Id: {
        type: Sequelize.INTEGER
    },
    ProfileId: {
        type: Sequelize.INTEGER
    },
    AffiliateId: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = ProfileToAffiliates;