(function() {

'use strict';

angular.module('app')
.controller('RecipesController', function ($route, $location, dataService) {

  var vm= this;

  // gets all categories
  dataService.getCategories(
    function (response) {
      vm.categories = response.data;
    }, 
    function (error) {
      console.log(error);
  }); //end getCategories

  //gets all recipies from db
  dataService.getRecipes(
    function (response) {
      vm.recipes = response.data;
    }, 
    function (error) {
      console.log(error);
  }); //end getRecipes

  //nav to add new recipe route
  vm.addRecipe = function () {
    $location.path('/add');
  };

  //delete recipe from db by ID and reload page
  vm.deleteRecipe = function (recipeName, recipeId) {
    var c = confirm('Are you sure you want to delete the ' + recipeName + ' recipe?');
      if (c) {
        dataService.deleteRecipe(recipeId, 
          function (response) {
            $route.reload();
          }, 
          function (error) {
            console.log(error);
        }); //end getRecipes
      }
  };

}); //end RecipesController

})();