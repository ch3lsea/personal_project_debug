var app = angular.module('app',["ngRoute", "ngResource"]);

app.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {

    var checkLoggedin = ['$q', '$http', '$location', '$rootScope', function($q, $http, $location, $rootScope){
        // Initialize a new promise
        var deferred = $q.defer();

        // Make an AJAX call to check if the user is logged in
        $http.get('/login/loggedin').success(function(user){
            // Authenticated
            if (user !== '0') {
                $scope.auth = true;
                deferred.resolve();
            }
            // Not Authenticated
            else {
                $rootScope.message = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    }];

    $httpProvider.interceptors.push([ '$q', '$location',function($q, $location) {
        return {
            response: function(response) {
                // do something on success
                return response;
            },
            responseError: function(response) {
                if (response.status === 401)
                    $location.url('/login');
                return $q.reject(response);
            }
        };
    }]);

    $routeProvider.
        when('/home', {
            templateUrl: "/views/routes/home.html"
        }).
        when('/blog', {
            templateUrl: "/views/routes/blog.html",
            resolve: {
                loggedin: checkLoggedin
            }
        }).
        when('/blogPost', {
            templateUrl: "/views/routes/blogPost.html",
            resolve: {
                loggedin: checkLoggedin
            }
        }).
        when('/login', {
            templateUrl: "/views/routes/login.html",
            controller: "LoginCtrl"
        }).
        otherwise({
            redirectTo: "/home"
        });
}]);

app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    //$scope.bPost = {};
    //$scope.posts = [];
    //var fetchPosts = function() {
    //    return $http.get('/posts').then(function(response){
    //        if(response.status !== 200){
    //            throw new Error('Failed to fetch posts from the API');
    //        }
    //        $scope.bPost = {};
    //        $scope.posts = response.data;
    //        console.log(response.data);
    //        return response.data;
    //    })
    //};
    //
    //fetchPosts();
    //
    //$scope.add = function(bPost){
    //    if(!$scope.bPost.title || !$scope.bPost.content) {
    //        alert("You missed a section there");
    //    } else {
    //        return $http.post('/posts', bPost).then(fetchPosts());
    //    }
    //};
    console.log('index controller is working');

}]);
