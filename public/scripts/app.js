$(document).ready(function() {
    //========================
    // API AJAX
    //========================
    $(".search-button").on('click', function getResult(e) {
        e.preventDefault();
        console.log('search button was clikced');
        var inputValue = $('.meal-input').serialize();
        console.log(inputValue);
        var endpoint = "https://api.nutritionix.com/v1_1/search/" + inputValue + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=208873bd&appKey=22cc00c8ce68e588fd138cf0f594db4d";
        $.ajax({
            method: "GET",
            url: endpoint, //the url of where you are searching
            success: mealSearch,
            error: onError
        });
    });

    function mealSearch(inputValue) {
        var hits = inputValue.hits;
        hits.map(function(e) {
            var retrievedName = e.fields.item_name,
                retrievedCalories = e.fields.nf_calories,
                retrievedServingSize = e.fields.nf_serving_size_qty,
                retrievedTotalFat = e.fields.nf_total_fat;

            $('.add-food-here').append(
                '<fieldset>' +
                '<div class="searchedMealName">' + '<h4>' + '<strong>' + 'Food Name : ' + '</strong>' + retrievedName + '</h4>' + '</div>' + '<div class="searchedCalories">' + '<h4>' + '<strong>' + 'Calories : ' + '</strong>' + retrievedCalories + '</h4>' + '</div>' +
                '<div class="searchedMealName">' + '<h4>' + '<strong>' + 'Serving Size : ' + '</strong>' + retrievedServingSize + '</h4>' + '</div>' + '<div class="searchedMealName">' + '<h4>' + '<strong>' + 'Total Fat : ' + '</strong>' + retrievedTotalFat + '</h4>' + '</div>' + '</fieldset>'
            );
            $('.meal-input').empty();
        });
    };

    function onError() {
        console.log("something is not working fix it");
    }
    //========================
    // API AJAX End
    //========================
    $.ajax({
        method: 'GET',
        url: '/api/food',
        success: renderAllFood
    });

    $('.submit').on('click', function(e) {
        e.preventDefault();
        console.log(e);
        console.log('button is clicked');
        console.log($('.mealForm').serialize());
        var foodData = $('.mealForm').serialize();
        console.log('foodData, ', foodData);
        $.post('/api/food', foodData, function(taco) {
            console.log('this is the food that was added, ', taco);
            renderFood(taco);
        });
        $('.mealForm').trigger("reset");
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
        console.log(this);
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
        var foodId = $(this).parents('.food').data('food-id');
        var $foodRow = $('[data-food-id=' + foodId + ']');

        var data = {
            foodName: $foodRow.find('.edit-food-name').val(),
            calories: $foodRow.find('.edit-calories').val(),
        };
        console.log('PUTing data for food', foodId, 'with data', data);
        console.log(data);
        console.log(foodId);
        $.ajax({
            method: 'PUT',
            url: '/api/food/' + foodId,
            data: data,
            success: handleFoodUpdatedResponse,
            error: onError
        });

        function onError(error1, error2, error3) {
            console.log('error on ajax for edit');
        }

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
            <div data-food-id="${food._id}">
              <div class='panel-footer' data-food-id="${food._id}">
                <button class='btn btn-danger delete-button'>Delete Food</button>
                <button class='btn btn-info edit-food'>Edit Food</button>
                <button class='btn btn-success save-food hidden'>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `);
        $('.foodList').prepend(foodHTML);
    };


});
