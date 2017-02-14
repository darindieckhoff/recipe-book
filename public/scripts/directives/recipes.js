angular.module('app')
.directive('recipes', function() {
  return {
    templateUrl: 'templates/recipes.html',
    controller: 'RecipesController',
    replace: true
  }
}) //end recipes directive
