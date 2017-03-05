
var app = angular.module('spotly', []);


app.controller('indexController', function($scope, $http){
   $scope.login = function () {
           // use $.param jQuery function to serialize data from JSON 
            var data = $.param({
                user: $scope.user
            });
        
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post('/getUser', data, config)
            .then(function successCallback(data, status, headers, config) {
                alert("Success");
            }, function errorCallback(data, status, header, config) {
                alert("Login Credential Fail");
            });
        };
});
    

