(function() {
    'use strict';

    angular.module('blog.login').controller('LoginController', LoginController);

    LoginController.$inject = ['dataservice', 'dataUrl', 'localstore', 'loginService', '$rootScope', '$location'];

    function LoginController(dataservice, dataUrl, localstore, loginService, $rootScope, $location) {
        let vm = this;
        vm.login = login;
        vm.user;
        vm.password;

        function login() {
            loginService.get(`${dataUrl}/lunch_booking_system_seed.json`, {
                user: vm.user
            }).then(function(data) {
                $rootScope.loggedIn = data;
                if (data.logged && data.user.type === 'USER') {
                    $location.path('/user')
                } else if (data.logged && data.user.type === 'CHEF') {
                    $location.path('/chef');
                }
            });
        }

    }

})();
