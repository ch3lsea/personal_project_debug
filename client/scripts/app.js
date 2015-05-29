var app = angular.module('app',["ngRoute", "ngResource"]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: "/views/routes/home.html"
        }).
        when('/blog', {
            templateUrl: "/views/routes/blog.html",
            controller: "AdminController",
            resolve: {
                loggedin: checkLoggedin
            }
        }).
        when('/blogPost', {
            templateUrl: "/views/routes/blogPost.html",
            controller: "LoginController"
        }).
        otherwise({
            redirectTo: "/home"
        });
}]);

app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    $scope.bPost = {};
    $scope.posts = [];
    var fetchPosts = function() {
        return $http.get('/posts').then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to fetch posts from the API');
            }
            $scope.bPost = {};
            $scope.posts = response.data;
            console.log(response.data);
            return response.data;
        })
    };

    fetchPosts();

    $scope.add = function(bPost){
        if(!$scope.bPost.title || !$scope.bPost.content) {
            alert("You missed a section there");
        } else {
            return $http.post('/posts', bPost).then(fetchPosts());
        }
    };

}]);
