
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

app.controller('profileController', function($scope, $http){

	$scope.viewSchedule = function(){
		document.getElementById("btn-achievement").className += " is-outlined";
		document.getElementById("btn-posts").className += " is-outlined";
		document.getElementById("btn-schedule").classList.remove("is-outlined");
		document.getElementById("schedule-overview").style.display ="block";
		document.getElementById("profile-overview").style.display ="none";
	}
	$scope.viewAchievement = function(){
		document.getElementById("btn-schedule").className += " is-outlined";
		document.getElementById("btn-posts").className += " is-outlined";
		document.getElementById("btn-achievement").classList.remove("is-outlined");
		document.getElementById("schedule-overview").style.display ="none";
		document.getElementById("profile-overview").style.display ="block";
	}
	
	
});


