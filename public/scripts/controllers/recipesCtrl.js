'use strict';

angular.module('app')
.controller('RecipesController', function ($route, $location, dataService) {

  var vm= this;

  dataService.getCategories(function (response) {
    vm.categories = response.data;
  }); //end getCategories

  dataService.getRecipes(function (response) {
    vm.recipes = response.data;
  }); //end getRecipes

  vm.addRecipe = function () {
    $location.path('/add');
  };

  vm.deleteRecipe = function (recipeId) {
    dataService.deleteRecipe(recipeId, function (response) {
    $route.reload();
    }); //end getRecipes
  };

}); //end RecipesController

