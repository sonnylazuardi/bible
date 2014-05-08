'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
   $scope.book = '';
   $scope.chapter = '';
   $scope.title = '';
   $scope.verses = [];
   $scope.search = '';
   $scope.loading = true;

   $scope.typed = function() {
      $scope.loading = true;
      if (/(\d*)\s*([a-z]+)\s*(\d+)(?::(\d+))?(\s*-\s*(\d+)(?:\s*([a-z]+)\s*(\d+))?(?::(\d+))?)?/i.test($scope.search)) {
         // console.log($scope.search);
         $.get('http://labs.bible.org/api/?passage='+$scope.search+'&type=json', function(data) {
            //check if there is data
            if (data.length > 0) {
               $scope.loading = false;
               $scope.$apply(function() {
                  $scope.book = data[0].bookname;
                  $scope.chapter = data[0].chapter;

                  $scope.verses = [];
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