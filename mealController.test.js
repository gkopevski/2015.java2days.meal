'use strict';

describe('java2days.mealController', function () {

    var scope,
        mealController,
        Services,
        BEER_RAND_ENDPOINT,
        deferred;

    beforeEach(module('ui.router'));
    beforeEach(module('common.configuration'));
    beforeEach(module('common.data'));
    beforeEach(module('java2days.meal'));


    beforeEach(inject(function (_Services_, $q) {
        Services = _Services_;
        deferred = $q.defer();
        spyOn(Services, 'get').and.returnValue(deferred.promise);
    }));

    beforeEach(inject(function ($rootScope, _BEER_RAND_ENDPOINT_, $controller) {
        scope = $rootScope.$new();
        BEER_RAND_ENDPOINT = BEER_RAND_ENDPOINT;
        mealController = $controller('MealController', {$scope: scope, Services: Services});

    }));

    describe('MealController', function () {

        it('should be defined', function () {
            expect(mealController).toBeDefined();
        });

        it('should have scope variables defined', function () {
            expect(scope.title).toBe('Title!');
            expect(scope.beer).toBe('');
        });

        it('should have the function init function defined and to have been called', function () {
            expect(mealController.init).toBeDefined();
            spyOn(mealController, 'init');
            mealController.init();
            expect(mealController.init).toHaveBeenCalled();
        });

        it('should have the function callRandomBeer invoked with success response', function () {
            expect(Services.get).toHaveBeenCalled();
            expect(Services.get.calls.count()).toBe(1);
            var data = {data:{name:'Some beer...'}};
            deferred.resolve(data);
            scope.$digest();
            expect(scope.beer).toEqual({name:'Some beer...'});
        });

        it('should have the function callRandomBeer invoked with error response', function () {
            expect(Services.get).toHaveBeenCalled();
            expect(Services.get.calls.count()).toBe(1);
            var data = 'I DO NOT CARE WHAT I AM RETURNING';
            deferred.reject(data);
            scope.$digest();
            expect(scope.beer).toEqual('We don\'t have any beer');
        });
    });

});