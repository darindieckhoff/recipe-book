(function() {

'use strict';

angular.module('app')
  .service('dataService', function($http) {

    // gets all recipes
    this.getRecipes = function (callback, errorCallback) {
      $http.get('/api/recipes')
      .then(callback)
    };

    //gets all categories
    this.getCategories = function (callback, errorCallback) {
      $http.get('/api/categories')
      .then(callback)
    };

    //gets all fooditems
    this.getFoodItems = function (callback, errorCallback) {
      $http.get('/api/fooditems')
      .then(callback)
    };

    // /*gets recipes by category - not currently used*/
    // this.getRecipesByCategory = function (selectedCategory, callback) {
    //   $http.get('/api/recipes?category=' + selectedCategory)
    //   .then(callback)
    // };

    //gets recipes by recipe ID
    this.getRecipesById = function (id, callback, errorCallback) {
      $http.get('/api/recipes/' + id)
      .then(callback)
    };

    //updates recipe in db
    this.updateRecipe = function (id , data, callback, errorCallback) {
      $http.put('/api/recipes/' + id , data)
      .then(callback, errorCallback)
    };

    //POSTs new recipe to db
    this.addRecipe = function (data, callback, errorCallback) {
      $http.post('/api/recipes', data)
      .then(callback, errorCallback)
    };

    //deletes recipe by recipe ID
    this.deleteRecipe = function (id, callback, errorCallback) {
      $http.delete('/api/recipes/' + id)
      .then(callback)
    };

  });

})();