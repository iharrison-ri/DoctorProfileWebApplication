// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const Restrictions = sequelize.define("Restrictions", {
    Id: {
        type: Sequelize.INTEGER
    },
    RestrictionType: {
        type: Sequelize.STRING(64)
    },
    RestrictionName: {
        type: Sequelize.STRING(64)
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Restrictions;