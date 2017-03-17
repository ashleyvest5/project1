var db = require("../models");
Food = db.Food;


function index(req, res){
  Food.find({}, function (err, food){
    if (err){
      console.log('err in index', err);
    }
    //TODO: make sure food is wrapped up in a json object like {food: food}
    res.json(food);
  });
};

function create(req, res){
  var food = {
    foodName : req.body.foodName,
    calories : req.body.calories
  };
  Food.create(food, function(err, potato){
    if (err){
      console.log('create error ', err);
    }
    //TODO: remove console.logs that aren't err handling from production code
    console.log('food added to the list ', food );
    res.json(food);
  });
};

function show(req, res){
  Food.findById(req.params.foodId, function(err, foundFood){
    if(err){
      console.log('error in the show function, ', err);
    }
    //TODO: remove console.logs that aren't err handling from production code
    console.log('found this, ', foundFood);
    res.json(foundFood);
  });
}




function destroy(req, res){
  // TODO: Match params conventions
  var id = req.params.foodId;
  //TODO: remove console.logs that aren't err handling from production code
  console.log(id);
  Food.findOneAndRemove({_id: id}, function (err, targetFood){
    if (err){
      console.log('something is wrong with the destroy function, ', err);
    }
    //TODO: remove console.logs that aren't err handling from production code
    console.log('deleted', targetFood);
    res.json(targetFood);
  });
}






function update(req, res){
  Food.findById(req.params.foodId, function (err, foundFood){
    if (err){
      console.log('something wrong with the update function, ', err);
    }
    //TODO: remove console.logs that aren't err handling from production code
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

// function update2(req, res){
//   var updateFood = {
//     foodName: req.body.foodName,
//     calories: parseInt(req.body.calories)
//   }
//   var updateId = req.params.foodId;
//
//   Food.findOneAndUpdate({_id: updateId}, updateFood, {document=true}, function (err, updatedFood){
//     if (err){
//       console.log('something wrong with the update function, ', err);
//     }
//     res.json(updatedFood)
//
//   });
// }

module.exports = {
    index: index,
    create: create,
    show: show,
    destroy: destroy,
    update: update
};
