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

//=============
// ROUTES
//=============



//=============
// Auth Start
//=============


app.get("/foodList", function(req, res) {
    // TODO: consider adding user to your ejs render to make it more personal
    res.render("foodList");
});
//add isLoggedIn after /foodList

app.get("/register", function registerUser(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    // req.body.username
    // req.body.password
    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            // consider adding flash messages / error handling for your register page.
            res.render("register", {message: "Incorrect email or password"});
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/foodList");
        })
    });
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/foodList",
    // TODO: are you able to send data along with this redirect? can we just failureRender?
    // can we let the user know 'incorrect email or password'
    failureRedirect: "/login"
}), function(req, res) {});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
//=============
// Auth End
//=============

//=============
// API ROUTES
//=============

//NOTE: this one is up top, so it gets priority over the second one
app.get('/', function index(req, res) {
  res.sendFile('views/index.html', {
    root: __dirname
  });
});
app.get('/', function index(req, res) {
  res.sendFile('views/foodList.ejs', {
    root: __dirname
  });
});

//index
app.get('/api', controllers.api.index);
app.get('/api/food', controllers.food.index);

//create
app.post('/api/food', controllers.food.create);
//show
app.get('/api/food/:foodId', controllers.food.show);
//delete
app.delete('/api/food/:foodId', controllers.food.destroy);
//update
app.put('/api/food/:foodId', controllers.food.update);

//=============
// API ROUTES
//=============

//=============
// FOOD ROUTES
//=============


app.get('/foodList', controllers.food.index);

//create
app.post('/foodList', controllers.food.create);
//show
app.get('/foodList/:foodId', controllers.food.show);
//delete
app.delete('/foodList/:foodId', controllers.food.destroy);

app.put('/foodList/:foodId', controllers.food.update);


//=============
// SERVER
//=============

app.listen(process.env.PORT || 3000, function() {
    console.log('project 1 is serving on 3000');
});
