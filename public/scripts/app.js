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

    function renderAllFood(food) {
        food.forEach(function(food) {
            console.log(food.foodName);
            renderFood(food);
        });
    }




    //=================================
    // add delete here
    //=================================



    $('.foodList').on('click', '.delete-button', handleDeleteFoodClick);

    function handleDeleteFoodClick(e) {
        console.log('delete-button was clicked');
        var foodId = $(this).closest('.food').data('food-id');
        console.log('this is data', foodId);
        console.log('this food is being deleted= ' + foodId);
        $.ajax({
            url: '/api/food/' + foodId,
            method: 'DELETE',
            success: handleDeleteFoodSuccess
        });
    }

    //callback after DELETE /api/food/:foodId
    function handleDeleteFoodSuccess(data) {
        var deletedFoodId = data._id;
        console.log('removing the following food from the page:', deletedFoodId);
        $('div[data-food-id=' + deletedFoodId + ']').remove();
    }

    //=================================
    // delete ends here
    //=================================




    //===============================
    $('.foodList').on('click', '.edit-food', handleFoodEditClick);
    $('.foodList').on('click', '.save-food', handleSaveChangesClick);

    // when the edit button for an food is clicked
    function handleFoodEditClick(e) {
        var $foodRow = $(this).closest('.food');
        var foodId = $foodRow.data('food-id');
        console.log('edit food', foodId);
        console.log($foodRow);

        // show the save changes button
        $foodRow.find('.save-food').toggleClass('hidden');
        // hide the edit button
        $foodRow.find('.edit-food').toggleClass('hidden');


    // get the food name and replace its field with an input element
    var foodName = $foodRow.find('span.food-name').text();
    $foodRow.find('span.food-name').html('<input class="edit-food-name" value="' + foodName + '"></input>');

    // get the calories and replace its field with an input element
    var calories = $foodRow.find('span.calories').text();
    $foodRow.find('span.calories').html('<input class="edit-calories" value="' + calories + '"></input>');

}
    // after editing an food, when the save changes button is clicked
    function handleSaveChangesClick(e) {
        var foodId = $(this).parents('.food').data('food-id'); // $(this).closest would have worked fine too
        var $foodRow = $('[data-food-id=' + foodId + ']');

        var data = {
            foodName: $foodRow.find('.edit-food-name').val(),
            calories: $foodRow.find('.edit-calories').val(),
        };
        console.log('PUTing data for food', foodId, 'with data', data);
        console.log(data);
        $.ajax({
            method: 'PUT',
            url: '/api/food/' + foodId,
            data: data,
            success: handleFoodUpdatedResponse
        });


    function handleFoodUpdatedResponse(potato) {
      console.log(potato);
        console.log('response to update', potato);

        var foodId = potato._id;
        console.log(foodId);
        // scratch this food from the page
        $('[data-food-id=' + foodId + ']').remove();
        // and then re-draw it with the updates ;-)
        renderFood(data);
    }
  }
    //===============================




    function renderFood(food) {

        var foodHTML = (`
    <div class="row food" data-food-id="${food._id}">

      <div class="col-md-10 col-md-offset-1" >
        <div class="panel panel-default">
          <div class="panel-body">
            <div class='row meal'>
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
            <button class='btn btn-danger delete-button'>Delete Food</button>
            <button class='btn btn-info edit-food'>Edit Food</button>
                <button class='btn btn-success save-food hidden'>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `);
        $('.foodList').prepend(foodHTML);
    };


});
