app.controller('LoginCtrl',['$scope','$rootScope','$http','$location' ,function($scope, $rootScope, $http, $location) {
    // This object will be filled by the form
    //I don't want other users, just one admin...?
    //$scope.user = {};

    // Register the login() function
    $scope.login = function(){
        $http.post('/login', {
            username: $scope.username,
            password: $scope.password
        })
            .success(function(user){
                // No error: authentication OK
                $rootScope.message = 'Authentication successful!';
                $location.url('/home');//Not sure if this is right. After login, does this send you to /home?
            })
            .error(function(){
                // Error: authentication failed
                $rootScope.message = 'Authentication failed.';
                $location.url('/home');
            });
    };
}]);