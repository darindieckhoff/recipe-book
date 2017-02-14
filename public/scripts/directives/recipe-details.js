angular.module('app')
.directive('recipeDetails', function() {
  return {
    templateUrl: 'templates/recipe-detail.html',
    controller: 'RecipeDetailController',
    replace: true
  }
}) //end recipes directive