(function() {
    'use strict';

    angular.module('menu.chef').controller('ChefController', ChefController);

    ChefController.$inject = ['dataservice', 'dataUrl', 'localstore', '$interval'];

    function ChefController(dataservice, dataUrl, localstore, $interval) {
        let vm = this;
        vm.preferencesArray = localstore.get('preferences') || null;
        vm.preferences = vm.preferencesArray ? vm.preferencesArray.join(',') : null;
        vm.dishes;
        vm.filteredDishes;
        vm.addDish = addDish;
        vm.removeDish = removeDish;
        vm.publishMenu = publishMenu;
        vm.error = false;

        activate();
        checkForOrders();

        function activate() {
            return getMenu().then(function() {
                console.log('Dishes received', vm.dishes);
                filterDishes();
            })
        }

        function getMenu() {
            return dataservice.get(`${dataUrl}/lunch_booking_system_seed.json`).then(function(data) {
                vm.dishes = data.meals;
                return vm.dishes;
            })
        }

        function publishMenu() {
            let valid = false,
                invalidDish;
            for (let dish of vm.filteredDishes) {
                valid = search(dish.foodCategory, vm.preferencesArray);
                if (!valid) {
                    invalidDish = dish.name;
                    break;
                }
            }
            if (valid) {
                localstore.set('menu', vm.filteredDishes);
            } else {
                vm.error = {
                    status: true,
                    invalidDish: invalidDish
                };
            }
        }

        function search(haystack, arr) {
            return arr.some(function(v) {
                return haystack.indexOf(v) >= 0;
            });
        }

        function filterDishes() {
            let filteredDishes = [];
            for (let dish of vm.dishes) {
                let hasPreference = search(dish.foodCategory, vm.preferencesArray);
                if (hasPreference) filteredDishes.push(dish);
            }
            vm.filteredDishes = filteredDishes;
        }

        function addDish(dish) {
            if (!vm.filteredDishes.includes(dish)) vm.filteredDishes.push(dish);
        }

        function removeDish(dish) {
            let index = vm.filteredDishes.indexOf(dish);
            vm.filteredDishes.splice(index, 1);
        }

        function checkForOrders() {
            let orders = localstore.get('orders'),
                newOrders;
            $interval(function() {
                let newOrders = localstore.get('orders');
                updateOrderCounter(newOrders)
                orders = newOrders;
            }, 5000);
        }

        function updateOrderCounter(orders) {
            let orderMap = new Map(JSON.parse(orders));
            let orderObj = Object.create(null);
            for (let [k, v] of orderMap) {
                orderObj[k] = v;
            }
            vm.ordersCount = orderObj;
        }

    }

})();
