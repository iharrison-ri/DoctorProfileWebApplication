// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
const connection = require('../sequelize');
// define a model
const test = connection.define("TestingPatientAccess", {
    name: Sequelize.STRING,
    id: Sequelize.INTEGER
})

module.export = test;