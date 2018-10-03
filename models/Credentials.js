// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
//bring in DB model
const sequelize = require("./index");
// define a model
const Credentials = sequelize.define("Credentials", {
    Id: {
        type: Sequelize.INTEGER
    },
    Name: {
        type: Sequelize.STRING(150)
    },
    CredentialOrder: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Credentials;