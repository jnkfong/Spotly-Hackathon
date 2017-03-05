
var app = angular.module('spotly', []);
var config = { headers : {'Content-Type': 'application/json'}}

app.controller('indexController', function($scope, $http){
   $scope.login = function () {
			
			var data = JSON.stringify({username: $scope.username, password: $scope.password});
           
            $http.post('./login', data, config)
            .then(function successCallback(data, status, headers, config) {
               if(typeof data[0].redirect === 'string' && typeof data[1].profile === 'string' ){
				   document.cookie = "profile=" + data[1].profile;
				   window.location.replace(data.redirect);
			   }
			   else{
				   alert("User and password are incorrect!");
			   }
            }, function errorCallback(data, status, header, config) {
                alert(data);
            });
			
        };
});

app.controller('profileController', function($scope, $http){

	$(document).ready(function(){
		var data = JSON.stringify({profile:getCookie("profile")});
		$http.post('./getProfile', data, config)
            .then(function successCallback(data, status, headers, config) {
              if(typeof data != "undefined"){
				$scope.user = data;
			  }
			  else{
				  
			  }
            }, function errorCallback(data, status, header, config) {
                alert(data);
            });
	});


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


//helper methods
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
