var db = require('./models'),
    Food = db.Food;

var foodList = [{
        foodName: 'potato',
        calories: 1,
    },
    {
        foodName: 'taco',
        calories: 1,
    },
    {
        foodName: 'pizza',
        calories: 1,
    },
    {
        foodName: 'burger',
        calories: 1,
    }
];

Food.remove({}, function(err, food) {
    Food.create(foodList, function(err, food) {
        if (err) {
            return console.log('something is broken ', err);
        }
        console.log("all food:", food);
        console.log("created", food.length, "food");
        process.exit();
    });
});
