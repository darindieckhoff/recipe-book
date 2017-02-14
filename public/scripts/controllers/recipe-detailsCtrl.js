'use strict';

angular.module('app')
.controller('RecipeDetailController', function ($route, $location, $routeParams, dataService) {

  var vm = this;
  var recipeId = $routeParams.id;
  var newRecipe = false;

  dataService.getCategories(function (response) {
    vm.categories = response.data;
  }); //end getCategories

  dataService.getFoodItems(function (response) {
    vm.foodItems = response.data;
  }); //end getFoodItems
  
  if ($location.$$path === '/add') {
    newRecipe = true;
    vm.recipe = {    };
    vm.recipe.ingredients = [{foodItem: '', condition: '', amount: ''}];
    vm.recipe.steps= [{description: ''}];
  } else {
    dataService.getRecipesById(recipeId, function (response) {
      vm.recipe = response.data;
    }); //end getRecipebyId
  } //end if

  vm.addIngredient = function () {
    vm.recipe.ingredients.push({foodItem: '', condition: '', amount: ''});
  };

  vm.addDescription = function () {
    vm.recipe.steps.push({description: ''});
  };

  vm.delete = function (data, $index) {
    data.splice($index, 1);
  };

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
        function (errorCallback) {
          vm.errorMessage = [];
          console.log(errorCallback);
      });
      $route.reload('/');
    } else {
      dataService.updateRecipe(vm.recipe._id, vm.recipe, function (response) {}, 
        function (response) {
          //vm.errorMessage = [];
          console.log(response);
      });
      $location.path('/');
    }
  }; //end save

  vm.cancel = function () {
    $location.path('/');
  }; //end cancel

}); //end RecipeDetailController