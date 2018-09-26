// bring in express and initiate it in app
const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const router = require("./sequelize");

//middleware
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
app.use(urlencodedParser);
app.use('/', router);

// the port the app will be running on
const PORT = process.env.PORT || 4000;
// connect to the node backend
app.listen(PORT, () => console.log(`app running on port ${PORT}!!`))