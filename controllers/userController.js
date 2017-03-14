var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    User = require("./models/user"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    controllers = require('./controllers'),
    db = require('./models');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require("express-session")({
    secret: "keys to the kingdom",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



////////////////////////////////////
//     CONTROLLER FUNCTIONS       //
////////////////////////////////////


// function registerUser (req, res){
//   req.body.username
//   req.body.password
//   User.register(new User ({
//     username: req.body.username
//   }), req.body.password, function (err, user) {
//     if (err) {
//       console.log(err);
//       res.render("register");
//     }
//     passport.authenticate("local")(req, res, function(){
//       res.redirect("/user");
//     })
//   });
// }
module.exports = {
    registerUser: registerUser
}
