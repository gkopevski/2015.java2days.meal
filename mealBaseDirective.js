(function () {
    'use strict';
    angular.module('java2days.meal')
        .directive('mealLink', function () {
        return {
            restrict: 'EA',
            replace: false,
            scope: {
                status: '@'
            },
            controller: ['$scope', '$state', function ($scope, $state) {
                $scope.goTo = function (target) {
                    $state.go(target);
                };
                $scope.showLink = function () {
                    return true;
                };
                $scope.link ='MealLink';
            }],
            templateUrl: 'meal/mealBase.tpl.html'
        };
    });
}());