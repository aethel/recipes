(function() {
    'use strict';

    angular.module('menu.core').factory('localstore', localstore);

    function localstore() {
        let service = {
            set,
            get
        }

        return service;

        function set(...args) {
          let [key, value] = args;
          localStorage.setItem(key,JSON.stringify(value));
        }

        function get(key) {
          let item = localStorage.getItem(key);
          if(item) return JSON.parse(item);
        }
    }

})();
