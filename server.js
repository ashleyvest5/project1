var express = require('express');
var bodyParser = require('body-parser');
var controllers = require('./controllers');
var db = require('./models');


var app = express();

app.use(express.static('/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));



app.get('/', function index(req, res){
  res.json('potato');
});










app.listen(process.env.PORT || 3000, function() {
    console.log('Listening at http://localhost:3000/');
});
