var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || "YOUR CURRENT LOCALHOST DB CONNECTION STRING HERE" );
var Food = require('./food');

module.exports.Food = Food;
