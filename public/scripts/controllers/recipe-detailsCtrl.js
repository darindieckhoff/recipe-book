(function() {

'use strict';

angular.module('app')
.controller('RecipeDetailController', function ($route, $location, $routeParams, dataService) {

  var vm = this;

  //gets recipe id from route param
  var recipeId = $routeParams.id;
  var newRecipe = false;
  vm.errorMessage = [];

  //gets categories from db
  dataService.getCategories(
    function (response) {
      vm.categories = response.data;
    }, 
    function (error) {
      console.log(error);
  }); //end getCategories

  //gets foodItems from db
  dataService.getFoodItems(
    function (response) {
      vm.foodItems = response.data;
    }, 
    function (error) {
      console.log(error);
  }); //end getFoodItems
  
  //checks if adding (creates empty recipe object) or 
  //editing recipe(gets recipe from db by route param id)
  if ($location.$$path === '/add') {
    newRecipe = true;
    vm.recipe = {};
    vm.recipe.ingredients = [{foodItem: '', condition: '', amount: ''}];
    vm.recipe.steps= [{description: ''}];
  } else {
    dataService.getRecipesById(recipeId, 
      function (response) {
        vm.recipe = response.data;
      }, 
      function (error) {
        console.log(error);
    }); //end getRecipebyId
  } //end if

  //adds blank ingredient object to ingredients array to add additional ingredients
  vm.addIngredient = function () {
    vm.recipe.ingredients.push({foodItem: '', condition: '', amount: ''});
  };

  //adds blank description object to descriptions array to add additional descriptions
  vm.addDescription = function () {
    vm.recipe.steps.push({description: ''});
  };

  //deletes ingredient or description
  vm.delete = function (data, $index) {
    data.splice($index, 1);
  };

  //POST or PUTs new recipe or recipe changes to db 
  //cookTime and PrepTime set to 0 by default (cannot be blank)
  vm.save = function () {
    if (newRecipe) {
      if (!vm.recipe.cookTime) {
        vm.recipe.cookTime = '0';
      } 
      if (!vm.recipe.prepTime) {
        vm.recipe.cookTime = '0';
      }
      dataService.addRecipe(vm.recipe, 
        function (response) {
          $location.path('/');
        }, 
        function (error) {
          vm.errorMessage.push(error.data.message);
      });
    } else {
      //converts cook and prep time to strings as required by db
      vm.recipe.cookTime = vm.recipe.cookTime.toString();
      vm.recipe.prepTime = vm.recipe.prepTime.toString();
      dataService.updateRecipe(vm.recipe._id, vm.recipe, 
        function (response) {
          $location.path('/');
        }, 
        function (error) {
          vm.errorMessage.push(error.data.message);
      });
    }
  }; //end save

  //clicking cancel button routes to intial page
  vm.cancel = function () {
    $location.path('/');
  }; //end cancel

}); //end RecipeDetailController

})();