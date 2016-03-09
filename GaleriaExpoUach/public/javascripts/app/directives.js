'use strict';

var app = angular.module('galeriaAppDirectives', []);

app.directive('imageBig', [function() {
        return {
            restrict: 'E',
            scope: {
                url: '=url'
            },
            template: '<img ng-src="{{url}}"> TEST'
        };
    }]);

