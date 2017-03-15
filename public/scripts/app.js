console.log("connected");

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


$(document).ready(function() {

    $.ajax({
        method: "GET",
        url: "/api/food",
        success: function onSuccess(food) {
            food.forEach(function renderEachFood(taco) {

                renderFood(taco);
            })
            console.log('index ajax works');
        },
        error: function onError(err) {
            console.log('index ajax is not working', err);
        }
    });

});

function renderFood(food) {
    var foodHTML = (`
    <div class="row food">

      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
          <div class="panel-body">
            <div class='row'>
              <div class="col-md-9 col-xs-12">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4 class='inline-header'>Food Name:</h4>
                    <span class='food-name'>${food.foodName}</span>
                  </li>
                  <li class="list-group-item">
                    <h4 class='inline-header'>Calories:</h4>
                    <span class='calories'>${food.calories}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class='panel-footer'>
            </div>
          </div>
        </div>
      </div>
    </div>
    `);
    $('#food').prepend(foodHTML);
};
