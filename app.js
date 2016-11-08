var app = angular.module("meanBlog",['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider,$urlRouterProvider){
    $stateProvider
    .state('home',{
        url:'/home',
        templateUrl: 'home.html',
        controller:'MainCtrl'
      },'posts',{
        url:'/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      }
    );
  $urlRouterProvider.otherwise('home');
}]);

app.factory("Posts", [function()
  var o = {
    posts: []
  };
  return o;
}]);

app.controller("MainCtrl",['$scope','Posts', function($scope,Posts){
  $scope.posts = Posts.posts;

  $scope.addPost = function(){
    if(!$scope.title || $scope.title===""){
      return;
    }
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: [
        {author: 'Joe', body: 'Cool', upvotes:0},
        {author: 'Bob', body:'Derp', upvotes:0}
      ]
    });
    $scope.title="";
    $scope.link="";
  };

  $scope.incrementUpvotes = function(post){
    post.upvotes +=1;
  };

}]);

app.controller("PostsCtrl", ['$scope','$stateParams','posts',function($scope,$stateParams, posts){
  $scope.post = posts.post[$stateParams.id];
  $scope.addComment = function(){
    if($scope.body===""){
      return;
    }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0
    });
    $scope.body= '';
  };
}]);
