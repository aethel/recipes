(function() {
    'use strict';

    angular.module('menu.core').factory('dataservice', dataservice);

    dataservice.$inject = ['$http','$log'];

    function dataservice($http, $log) {
        let service = {
            get
        }

        return service;

        function get(url) {
          return $http.get(url)
            .then(success)
            .catch(failed);

          function success (response) {
              return response.data;
            }

           function failed (error) {
              console.log(`Failure getting data: ${error.data}`);
            }
        }
    }

})();
