(function() {
    'use strict';

    angular.module('blog.core').factory('dataservice', dataservice);

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
              $log(`Failure getting data: ${error.data}`);
            }
        }
    }

})();
