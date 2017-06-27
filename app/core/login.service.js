(function() {
    'use strict';

    angular.module('blog.core').factory('loginService', loginService);

    loginService.$inject = ['$http','$log', 'dataUrl','dataservice'];

    function loginService($http, $log, dataUrl, dataservice) {

      let loginService = {
        get: get
      };

      return loginService;

        function get(url,credentials) {
          return $http.get(url)
            .then(success)
            .catch(failed);

          function success (response) {
            let users = response.data.users;
            let role = users.find(function(item){
              return credentials.user == item.fullname;
            })
              let loggin =  role ? {user: role, logged: true} :  {logged: false};
              return loggin;
            }

           function failed (error) {
              console.log(`Failure getting data: ${error.data}`);
            }
        }
    }

})();
