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

        function selectDish() {
            console.log(vm.order, 'food');
            let orders;
            if (!localstore.get('orders')) {
                setFirstOrder(vm.order, user.id);
            } else {
                updateExistingOrder(vm.order, user.id)
            }
        }

        function setFirstOrder(order, user) {
            let orders = new Map();
            orders.set(order, [user]);
            console.log(orders);
            localstore.set('orders', JSON.stringify([...orders]));
        }

        function updateExistingOrder(dish, user) {
            let orders = new Map(JSON.parse(localstore.get('orders')));
            let order = orders.get(dish);
            if (!order) {
                orders.set(dish, [user])
                localstore.set('orders', JSON.stringify([...orders]));
                return;
            }
            if (order.includes(user)) {
                order.splice(order.indexOf(user), 1);
            } else {
                order.push(user);
            }
            localstore.set('orders', JSON.stringify([...orders]));
        }
    }



})();
