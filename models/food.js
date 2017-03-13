var mongoose = require('mongoose');


var Schema = mongoose.Schema;


var FoodSchema = new Schema({
  foodName: String,
  calories: Number,
  time: Date
});



var Food = mongoose.model('Food', FoodSchema);

module.exports = Food; 
