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
        var foodData = $('form').serialize();
        console.log('foodData, ', foodData);
        $.post('/api/food', foodData, function(taco) {
            console.log('this is the food that was added, ', taco);
            renderFood(taco);
        });
        $('form').trigger("reset");
    });
    //=======
    $('.food').on('click', function(e) {
        e.preventDefault();
        console.log('it was clicked');
    });
    $('.food').on('click', handleDeleteFood);

    function handleDeleteFood(e) {
        var foodId = $(this).closest('.food').data('food-id');
        console.log('this is data', foodId);
        console.log('someone wants to delete food id=' + foodId);
        $.ajax({
            url: '/api/food/:' + foodId,
            method: 'DELETE',
            success: handleDeleteFoodSuccess
        });
    }

    // callback after DELETE /api/food/:foodId
    function handleDeleteFoodSuccess(data) {
        var deletedFoodId = data._id;
        console.log('removing the following food from the page:', deletedFoodId);
        $('div[data-food-id=' + deletedFoodId + ']').remove();
    }
    //==========
    function renderAllFood(food) {
        food.forEach(function(food) {
            console.log(food.foodName);
            renderFood(food);
        });
    }



    function renderFood(food) {

        var foodHTML = (`
    <div class="row food">

      <div class="col-md-10 col-md-offset-1" data-food-id=${food._id}>
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
            <button class='btn btn-danger delete-food'>Delete Food</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `);
        $('#food').prepend(foodHTML);
    };


});
