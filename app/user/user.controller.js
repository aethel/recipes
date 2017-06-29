(function() {
    'use strict';

    angular.module('menu.user').controller('UserController', UserController);

    UserController.$inject = ['dataservice', 'dataUrl', 'localstore', 'preferences', '$rootScope'];

    function UserController(dataservice, dataUrl, localstore, preferences, $rootScope) {
        let vm = this;
        vm.preferences = preferences;
        vm.selectPreference = selectPreference;
        vm.findPrefence = findPrefence;
        vm.menu = localstore.get('menu') || null;
        vm.selectDish = selectDish;

        let user = $rootScope.loggedIn.user;

        function findPrefence(data) {
            let preferences = localstore.get('preferences')
            if (preferences && preferences.includes(data)) {
                return true;
            } else {
                return false;
            }
        }

        function selectPreference(data) {
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

        function selectDish(dishId){
          let orders;
          if(!localstore.get('orders')){
            let order = {
              dishId: dishId,
              user: [user.id]
            }
            localstore.set('orders', [order]);
          } else {
            orders = localstore.get('orders');
            for(let order of orders) {
              if(order.dishId === dishId){
                let orderUsers = order.user;
                let userIdPresent = orderUsers.some(item => item === user.id);
                if(userIdPresent) {
                   orderUsers.splice(orderUsers.indexOf(user.id),1)
                 } else {
                   orderUsers.push(user.id);
                 }
              } else {
                let order = {
                  dishId: dishId,
                  user: [user.id]
                }
                orders.push(order);
              }
            }
            localstore.set('orders', orders);
          }



            console.log(localstore.get('orders'));
          // check if orderlist is saved
          //if dish id exists
          // check if user id
          //if user id exists and is same as this user, remove. else, add
        }

    }

})();
