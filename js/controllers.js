'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('HomeCtrl', ['$scope', 'syncData', 'englishBook', 'indonesiaBook', function($scope, syncData, englishBook, indonesiaBook) {
   $scope.book = '';
   $scope.chapter = '';
   $scope.title = '';
   $scope.verses = [];
   $scope.search = '';
   $scope.loading = true;
   $scope.language = 'en';
   $scope.options = [{ name: 'English', value: 'en' }, { name: "Bahasa Indonesia", value: 'id' }];
   $scope.getBook = function(passage) {
      var parsed = passage.split(" ");
      if (parsed.length > 2) {
         for (var i = 1; i < parsed.length-1; i++) {
            parsed[0] += ' ' + parsed[i];
         }
      }
      return parsed[0];
   }
   $scope.getAddress = function(passage) {
      var parsed = passage.split(" ");
      return parsed[parsed.length-1];
   }
   $scope.changeLang = function() {
      console.log('change language');
      $('#search-box').typeahead('destroy');
      var book = $scope.getBook($scope.search);
      var address = $scope.getAddress($scope.search);
      switch ($scope.language) {
         case 'en':
            var curId = indonesiaBook.indexOf(book);
            $scope.search = englishBook[curId] + ' ' + address;
            $scope.typed();
            $('#search-box').typeahead({source: englishBook});
            break;
         case 'id':
            var curId = englishBook.indexOf(book);   
            $scope.search = indonesiaBook[curId] + ' ' + address;
            $scope.typed();
            $('#search-box').typeahead({source: indonesiaBook});
            break;
      }
   }
   $scope.urlForLang = function() {
      switch ($scope.language) {
         case 'en':
            return 'http://labs.bible.org/api/?passage='+$scope.search+'&type=json';
            break;
         case 'id':
            return 'http://sonnylab.com/api/alkitab/'+$scope.search;
            break;
      }
   }

   angular.element('#search-box').typeahead({source: englishBook});

   $scope.typed = function() {
      $scope.loading = true;
      if (/(\d*)\s*([a-z]+)\s*(\d+)(?::(\d+))?(\s*-\s*(\d+)(?:\s*([a-z]+)\s*(\d+))?(?::(\d+))?)?/i.test($scope.search)) {
         // console.log($scope.search);
         $.get($scope.urlForLang(), function(data) {
            //check if there is data
            if (data.length > 0) {
               $scope.loading = false;
               $scope.$apply(function() {
                  $scope.book = data[0].bookname;
                  $scope.chapter = data[0].chapter;
                  $scope.verses = [];
                  if (data[0].title) {
                     $scope.title = data[0].title;
                  } else {
                     $scope.title = '';
                  }
                  data.forEach(function(item) {
                     var newItem = {
                        verse: item.verse,
                        text: item.text
                     };
                     $scope.verses.push(newItem);
                  });
               });
            }
         }, 'jsonp');
      }
   }

   // $scope.typed();
   $.get('http://labs.bible.org/api/?passage=votd&type=json', function(data){
      if (data.length > 0) {
         $scope.$apply(function() {
            $scope.search = data[0].bookname + ' ' + data[0].chapter + ':' + data[0].verse;
            $scope.typed();
         });
      }
   }, 'jsonp');
}]);