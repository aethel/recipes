(function() {
    'use strict';

    angular.module('menu.core').run(loginTest);

    loginTest.$inject = ['$rootScope', '$location'];

    function loginTest($rootScope, $location) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            let loggedIn = $rootScope.loggedIn;
            if(!loggedIn || !loggedIn.logged ){
              $location.path('/login');
            }
        });
    }
})();
