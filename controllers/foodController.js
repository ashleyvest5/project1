var db = require("../models");
Food = db.Food;


function index(req, res){
  Food.find({}, function (err, food){
    if (err){
      console.log('err in index', err);
    }
    res.json(food);
  });
};

function create(req, res){
  var food = new db.Food ({
    foodName : req.body.foodName,
    calories : req.body.calories
  });
  Food.create(food, function(err, potato){
    if (err){
      console.log('create error ', err);
    }
    console.log('food added to the list ', food );
    res.json(food);
  });
};

function show(req, res){
  Food.findById(req.params.foodId, function(err, foundFood){
    if(err){
      console.log('error in the show function, ', err);
    }
    console.log('found this, ', foundFood);
    res.json(foundFood);
  });
}




function destroy(req, res){
  Food.findOneAndRemove({_id: req.params.foodId}, function (err, foundFood){
    if (err){
      console.log('something is wrong with the destroy function, ', err);
    }
    console.log('deleted', foundFood);
    res.json(foundFood);
  });
}






function update(req, res){
  Food.findById(req.params.foodId, function (err, foundFood){
    if (err){
      console.log('something wrong with the update function, ', err);
    }
    foundFood.foodName = req.body.foodName;
    foundFood.calories = req.body.calories;
    fonudFood.save(function(err, updatedFood){
      if(err){console.log('could save the food. look at the food function');}
      console.log('entery changed, ', updatedFood);
      res.json(updatedFood);
    });
  });
}



module.exports = {
    index: index,
    create: create,
    show: show,
    destroy: destroy,
    update: update
};
