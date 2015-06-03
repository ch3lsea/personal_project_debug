

var app = angular.module('app',["ngRoute", "ngResource"]);

app.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {


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
            templateUrl: "/views/routes/blog.html"
        }).
        when('/blogPost', {
            templateUrl: "../views/routes/blogPost.html"
        }).
        when('/login', {
            templateUrl: "/views/routes/login.html",
            controller: "LoginCtrl",
            resolve: {
                loggedin: checkLoggedin
            }
        }).
        otherwise({
            redirectTo: "/home"
        });
}]);
//
////My fix attempt: same error as Joe's, but also has $rootScope not defined error
////$rootScope.Scope(['$rootScope', '$http', function($rootScope, $http){
////    var checkLoggedin = function() {
////        // Make an AJAX call to check if the user is logged in
////        $http.get('/login/loggedin').success(function (user) {
////            // Authenticated
////            if (user !== '0') {
////                console.log('Authenticated');
////                return true;
////            }
////            // Not Authenticated
////            else {
////                console.log('Not Authenticated');
////                return false;
////            }
////        });
////    };
////    checkLoggedin();
////}]);
//
////Joe's fix attempt: runs into checkLoggedin not defined error...?
app.run(['$rootScope', '$http', function($rootScope, $http){

    $rootScope.checkLoggedin = function(){
        console.log("rootScope things are happening");
        // Make an AJAX call to check if the user is logged in
        //$http.get('/login/loggedin').success(function(user){
        //    // Authenticated
        //    if (user !== '0') {
        //        console.log('Authenticated');
        //        return true;
        //    }
        //    // Not Authenticated
        //    else {
        //        console.log('Not Authenticated');
        //        return false;
        //    }
        //});
    };

}]);
//
app.controller("NavController", ['$scope', '$http', function($scope, $http){
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
    //$rootScope.checkLoggedin();
    //add a watch to it anytime it runs...?

}]);
