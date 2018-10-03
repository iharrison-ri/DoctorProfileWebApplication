// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const ContactInfo = sequelize.define("ContactInfo", {
    Id: {
        type: Sequelize.INTEGER
    },
    ProfileId: {
        type: Sequelize.INTEGER
    },
    Address1: {
        type: Sequelize.STRING(150)
    },
    Address2: {
        type: Sequelize.STRING(150)
    },
    City: {
        type: Sequelize.STRING(64)
    },
    State: {
        type: Sequelize.STRING(2)
    },
    Zip: {
        type: Sequelize.STRING(15)
    },
    Email: {
        type: Sequelize.STRING(64)
    },
    Phone1: {
        type: Sequelize.STRING(25)
    },
    Phone2: {
        type: Sequelize.STRING(25)
    },
    Fax: {
        type: Sequelize.STRING(25)
    },
    Comments: {
        type: Sequelize.STRING(1000)
    },
    EffectiveDate: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = ContactInfo;