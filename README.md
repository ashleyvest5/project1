# Project 1

Application will allow the user to create an account, log meals and track their calorie intake for the day. Users can add, edit and delete entries as well as search the Nutritionix API for over 699k foods. 


# Built With

- JavaScript
- Bootstrap
- JQuery 
- Express
- Mongoose
- Node.js
- AJAX 
- MongoDB 
- Nutritionix API

# Sprints 
- Sprint 0
Setup directory, setup HTML. 
- Sprint 1
Serve and display hard coded data for test.
- Sprint 2
Allow users to create accounts and add personalized info to their account.
- Sprint 3
setup the create function so the user can add food.
- Sprint 4
Setup delete function so the user can all to delete meal.
- Sprint 5
Setup update function to allow user to make changes to the existing post.
- Sprint 6
Nutritionix API. 
- Sprint 7
Add to Heroku. 

# Features
- Create, view, delete and upadate food entries. 
- Search Nutritionix API for nutrition facts. 
- Create user, sign in and sign out. 


# Planned Features 
- Resolve known issues such as search results showing up twice, issues with user auth and not being able to re-edit an edited entry. 
- Add search results from API as food entry. 
- Search API by calories, fat content, etc...
- Add pictures of food. 
- Add user profile pictures. 

# Code 
app.get("/foodList", isLoggedIn, function(req, res) {
    res.render("foodList");
});
//add isLoggedIn after /foodList

app.get("/register", function registerUser(req, res) {
    res.render("register");
});
app.post("/register", function(req, res) {
    req.body.username
    req.body.password
    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.render("register");
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

