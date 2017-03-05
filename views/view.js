
var app = angular.module('spotly', []);


app.controller('indexController', function($scope, $http){
   $scope.login = function () {

			var data = JSON.stringify({username: $scope.username, password: $scope.password});
      var config = { headers : {'Content-Type': 'application/json'}};
            $http.post('./login', data, config)
            .then(function successCallback(response, status, headers, config) {
               if(typeof response.data.redirect === 'string' && typeof response.data.profile === 'string' ){
				   document.cookie = "profile=" + response.data.profile;
				   window.location.replace(response.data.redirect);
			   }
			   else{
				   alert("User and password are incorrect!");
			   }
            }, function errorCallback(response, status, header, config) {
                alert(response);
            });

        };
});

app.controller('profileController', function($scope, $http){

	$(document).ready(function(){
		var data = JSON.stringify({profile:getCookie("profile")});
		var config = { headers : {'Content-Type': 'application/json'}};
		$http.post('./getProfile', data, config)
            .then(function successCallback(response, status, headers, config) {
              if(typeof response.data != "undefined"){
				$scope.user = response.data[0];
			  }
			  else{

			  }
            }, function errorCallback(response, status, header, config) {
                alert(response);
            });
		$http.post('./getAcheivements', data, config)
            .then(function successCallback(response, status, headers, config) {
              if(typeof response.data != "undefined"){
				$scope.achievements = response.data;
			  }
			  else{

			  }
            }, function errorCallback(response, status, header, config) {
                alert(response);
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
