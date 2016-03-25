(function () {
    'use strict';

    angular.module('java2days.meal')
        .controller('MealController',
        function ($scope, Services, BEER_RAND_ENDPOINT) {
            $scope.title = 'Title!';
            $scope.beer = '';

            var callRandomBeer = function() {
                Services.get(BEER_RAND_ENDPOINT).then(
                    function (success) {
                        $scope.beer = success.data;
                    },
                    function (error) {
                        $scope.beer = 'We don\'t have any beer';
                        console.log(JSON.stringify(error));
                    }
                );
            };
            var init = function(){
                callRandomBeer();
            };

            this.init = init;

            init();
        });

}());