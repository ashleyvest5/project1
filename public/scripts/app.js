$(document).ready(function() {
    console.log("connected");
    $.ajax({
        method: 'GET',
        url: '/api/food',
        success: renderAllFood
    });

    $('.submit').on('click', function(e) {
        e.preventDefault();
        console.log(e);
        console.log('button is clicked');
        console.log($('form').serialize());
        var data = $('form').serialize();
        console.log('data, ', data);
        $.post('/api/food', data, function(taco) {
            console.log('this is the food that was added, ', taco);
            renderFood(taco);
        });
        $(this).trigger("reset");
    });


function renderAllFood(food) {
    food.forEach(function(food) {
        console.log(food.foodName);
        renderFood(food);
    });
}



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


});
