var app=angular.module('single-page-app',['ngRoute']);


app.config(function($routeProvider){


      $routeProvider
      	  .when('/',{
                templateUrl: 'public/home.html'
          })
      	  .when('/CipherEncryption',{
                templateUrl: 'public/CipherEncryption.html'
          })
          .when('/RailFenceEncryption',{
                templateUrl: 'public/RailFenceEncryption.html'
          })
          .when('/About',{
                templateUrl: 'public/About.html'
          });


});


app.controller('cfgController',function($scope){

      $scope.message="";

});

app.controller('AppsController', ['$scope', function($scope) {
  $scope.display_rownumber = '';
}]);
