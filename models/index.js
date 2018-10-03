// bring in an instance of the Sequelize object
const Sequelize = require('sequelize');
// bring in the configuration
const config = require('../config/config').db;
// intiate an instance of the Sequelize object
const sequelize = new Sequelize(config);
// test the connection to the database
sequelize.authenticate()
    .then(() => console.log('connected to the database!!'))
    .catch(error => console.log(error));

module.exports = sequelize;