(function() {
  'use strict';

  describe('hz.framework.bind-scope module', function() {
    it('should have been defined', function() {
      expect(angular.module('hz.framework.bind-scope')).toBeDefined();
    });
  });

  describe('bind-scope directive', function() {

    var $scope, $element;

    beforeEach(module('hz'));
    beforeEach(module('horizon.framework.widgets'));
    beforeEach(module('hz.framework.bind-scope'));

    beforeEach(module('hz.framework.bind-scope', function($compileProvider) {
      $compileProvider.directive('testBindScope', function() {
        return {
          restrict: 'E',
          scope: {
            itemList: '='
          },
          transclude: true,
          template: '<ul><li ng-repeat="item in itemList" bind-scope>' +
                    '  <span bind-scope-target></span>' +
                    '</li></ul>'
        };
      });
    }));

    beforeEach(inject(function($injector) {
      var $compile = $injector.get('$compile');
      $scope = $injector.get('$rootScope').$new();

      $scope.fakeData = [
          { id: '1', animal: 'cat' },
          { id: '2', animal: 'dog' },
          { id: '3', animal: 'fish' }
      ];

      var markup = '<test-bind-scope item-list="fakeData">{$ item.animal $}</test-bind-scope>';

      $element = angular.element(markup);
      $compile($element)($scope);

      $scope.$digest();
    }));

    it('should have 3 list items', function() {
      expect($element.find('li').length).toBe(3);
    });

    it('should have 3 list items with values "cat", "dog" and "fish"', function() {
      var listItems = $element.find('li');
      expect(listItems[0].textContent.trim()).toBe('cat');
      expect(listItems[1].textContent.trim()).toBe('dog');
      expect(listItems[2].textContent.trim()).toBe('fish');
    });

  });

})();