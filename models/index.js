var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project1');
// mongoose.connect( process.env.mongolab-deep-65018 || "mongodb://localhost/project1" );
var Food = require('./food');

module.exports.Food = Food;
