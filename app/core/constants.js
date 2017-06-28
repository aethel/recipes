(function() {
    'use strict';

    angular
         .module('menu.core')
         .constant('dataUrl', `${window.location.protocol}//${window.location.host}/content`)
         .constant('preferences', ["Vegetarian", "Diary Free", "Nut Free", "Eggs Free", "Vegan"])

})();
