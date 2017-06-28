(function() {
    'use strict';

    angular.module('menu.user').controller('UserController', UserController);

    UserController.$inject = ['dataservice', 'dataUrl', 'localstore', 'preferences'];

    function UserController(dataservice, dataUrl, localstore, preferences) {
        let vm = this;
        vm.preferences = preferences;
        vm.selectPreference = selectPreference;
        vm.findPrefence = findPrefence;

        function findPrefence(data){
          let preferences = localstore.get('preferences')
          if (preferences && preferences.includes(data)) {
            return true;
          } else {
            return false;
          }
        }

        function selectPreference(data) {
            console.log(data);
            let preferences = [];
            if (localstore.get('preferences')) preferences = localstore.get('preferences');

            if (preferences.includes(data)) {
                let index = preferences.findIndex(i => i === data);
                preferences.splice(index, 1);
            } else {
                preferences.push(data)
            }
            localstore.set('preferences', preferences);
        }

    }

})();
