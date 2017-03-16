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
  var id = req.params.foodId;
  console.log(id);
  Food.findOneAndRemove({_id: id}, function (err, targetFood){
    if (err){
      console.log('something is wrong with the destroy function, ', err);
    }
    console.log('deleted', targetFood);
    res.json(targetFood);
  });
}






function update(req, res){
  Food.findById(req.params.foodId, function (err, foundFood){
    if (err){
      console.log('something wrong with the update function, ', err);
    }
    console.log('this is the food ', foundFood);
    foundFood.foodName = req.body.foodName;
    foundFood.calories = parseInt(req.body.calories);
    console.log(req.body.calories);
    console.log(foundFood.foodName);
    foundFood.save(function(err, updatedFood){
      console.log(foundFood);
      if(err){console.log('could save the food. look at the update function');}
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
