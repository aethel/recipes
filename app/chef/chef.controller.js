(function() {
    'use strict';

    angular.module('menu.chef').controller('ChefController', ChefController);

    ChefController.$inject = ['dataservice', 'dataUrl', 'localstore'];

    function ChefController(dataservice, dataUrl, localstore) {
        let vm = this;
        vm.preferencesArray = localstore.get('preferences') || null;
        vm.preferences = vm.preferencesArray ? vm.preferencesArray.join(',') : null;
        vm.dishes;
        vm.filteredDishes;
        vm.addDish = addDish;
        vm.removeDish = removeDish;
        vm.publishMenu = publishMenu;

        activate();

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

        function search(haystack, arr) {
          return arr.some(function(v){
            return haystack.indexOf(v) >= 0;
          });
        }

        function filterDishes(){
          let filteredDishes = [];

          for (let dish of vm.dishes) {
            let hasPreference = search(dish.foodCategory, vm.preferencesArray);
            if(hasPreference) filteredDishes.push(dish);
          }
          console.log(filteredDishes);
          vm.filteredDishes = filteredDishes;
        }

        function addDish(dish){
          vm.filteredDishes.push(dish);
        }

        function removeDish(dish){
          let index = vm.filteredDishes.indexOf(dish);
          vm.filteredDishes.splice(index,1);
        }
    }

})();
