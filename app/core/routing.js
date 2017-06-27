(function() {
    'use strict';

    angular.module('blog.routing').config(routing);

    routing.$inject = ['$routeProvider'];

    function routing($routeProvider) {
        $routeProvider.
        when('/chef', {
            templateUrl: 'chef/chef.html',
            controller: 'ChefController',
            controllerAs: 'c'
        }).
        when('/user', {
            templateUrl: 'user/user.html',
            controller: 'UserController',
            controllerAs: 'u'
        }).
        when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginController',
            controllerAs: 'l'
        }).
        when('/', {
            templateUrl: 'login/login.html',
            controller: 'LoginController',
            controllerAs: 'l'
        }).
        otherwise({
            redirectTo: '/login'
        });
    }

})();
