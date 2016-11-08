var app = angular.module("meanBlog",['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider,$urlRouterProvider){
    $stateProvider
      .state('home',{
        url:'/home',
        templateUrl: '/home.html',
        controller:'MainCtrl'
        // resolve: {
        //   postPromise: ['posts', function(posts){
        //     return posts.getAll();
        //   }]
        // }
    })
      .state('posts',{
        url:'/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
        // resolve: {
        //   post: ['$stateParams', 'posts', function($stateParams, posts){
        //     return posts.get($stateParams.id);
        //   }]
        // }
    });
  $urlRouterProvider.otherwise('home');
}]);

app.factory("Posts", [function(){
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
      upvotes: 0
    });
    $scope.title="";
    $scope.link="";
  };

  $scope.incrementUpvotes = function(post){
    post.upvotes +=1;
  };

}]);

app.controller("PostsCtrl", ['$scope','$stateParams','posts','post',function($scope,$stateParams, posts,post){
  $scope.post = post;
  $scope.addComment = function(){
    if($scope.body===""){
      return;
    }
    posts.addComment(post._id, {
      body: $scope.body,
      author: 'user'
    }).success(function(comment){
      $scope.post.comments.push(comment);
    });
    $scope.body= '';
  };
  $scope.incrementUpvotes = function(comment){
    posts.upvoteComment(post,comment);
  };

}]);
