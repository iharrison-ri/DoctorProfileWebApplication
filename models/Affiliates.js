// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const Affiliates = sequelize.define("Affiliates", {
    Id: {
        type: Sequelize.INTEGER
    },
    EffectiveDate: {
        type: Sequelize.DATE
    },
    TermDate: {
        type: Sequelize.DATE
    },
    AffiliateOrder: {
        type: Sequelize.INTEGER
    },
    Name: {
        type: Sequelize.STRING(64)
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Affiliates;