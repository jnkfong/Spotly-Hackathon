
var app = angular.module('spotly', []);


app.controller('indexController', function($scope, $http){
   $scope.login = function () {
           // use $.param jQuery function to serialize data from JSON 
			/*
		   var data = $.param({
                username: $scope.username,
				password: $scope.password
            });
			*/
			
			var data = JSON.stringify({username: $scope.username, password: $scope.password});
            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
			
			
			
            $http.post('./login', data, config)
            .then(function successCallback(data, status, headers, config) {
                if(data === "Incorrect"){
					alert("Incorrect credentials!");
				}
				else{
					alert("Proceeding...");
				}
            }, function errorCallback(data, status, header, config) {
                alert(data);
            });
			
        };
});
    

