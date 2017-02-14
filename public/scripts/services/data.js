'use strict';

angular.module('app')
  .service('dataService', function($http) {

    this.getRecipes = function (callback) {
      $http.get('/api/recipes')
      .then(callback)
    };

    this.getCategories = function (callback) {
      $http.get('/api/categories')
      .then(callback)
    };

    this.getFoodItems = function (callback) {
      $http.get('/api/fooditems')
      .then(callback)
    };

    this.getRecipesByCategory = function (selectedCategory, callback) {
      $http.get('/api/recipes?category=' + selectedCategory)
      .then(callback)
    };

    this.getRecipesById = function (id, callback) {
      $http.get('/api/recipes/' + id)
      .then(callback)
    };

    this.updateRecipe = function (id , data, callback, errorCallback) {
      $http.put('/api/recipes/' + id , data)
      .then(callback)
    };

    this.addRecipe = function (id , data, callback, errorCallback) {
      $http.post('/api/recipes', data)
      .then(callback, errorCallback)
    };

    this.deleteRecipe = function (id, callback) {
      $http.delete('/api/recipes/' + id)
      .then(callback)
    };

  });