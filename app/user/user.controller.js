(function() {
    'use strict';

    angular.module('blog.user').controller('UserController', UserController);

    UserController.$inject = ['dataservice', 'dataUrl', 'localstore'];

    function UserController(dataservice, dataUrl, localstore) {
        let vm = this;
        vm.articles;
        vm.likeArticle = likeArticle;
        vm.isLiked = isLiked;

        activate();

        function activate() {
            return getArticles().then(function() {
                console.log('Articles received', vm.articles);

            })
        }

        function getArticles() {
            return dataservice.get(`${dataUrl}/articles.json`).then(function(data) {
                vm.articles = data.articles;
                return vm.articles;
            })
        }

        function likeArticle(id) {
            let likedArticlesArray = [];
            if (localstore.get('liked')) {
                likedArticlesArray = localstore.get('liked');
            }
            if(likedArticlesArray.includes(id)){
              let index = likedArticlesArray.findIndex(i => i === id);
              likedArticlesArray.splice(index,1);
            } else {
              likedArticlesArray.push(id);
            }
            localstore.set('liked', likedArticlesArray);
        }

        function isLiked(id){
          if (!localstore.get('liked')) {
              return;
          }
          let likedArticlesArray = localstore.get('liked');
          let foundId = likedArticlesArray.find(i => i === id);
          return (foundId === id);
        }

    }

})();
