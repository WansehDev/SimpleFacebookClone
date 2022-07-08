const app = angular.module('newsFeedApp', []);

app.controller('groupController', function($scope) {
    let markedGroups = [];
    $scope.groups    = ['Samurai Group', 'Ninja Group', 'Ship Group', 'Robot Group'];

    $scope.addGroup = function() {
        // check if group is already in the list
        $scope.msg = '';
        if (!$scope.group_name) {
            return;
        } else if ($scope.groups.indexOf($scope.group_name) === -1) {
            $scope.groups.push($scope.group_name);
            $scope.group_name = '';
        } else {
            $scope.msg = 'Group already exists';
        }
    };

    $scope.markedGroup = function(group) {
        markedGroups.push(group);
    };

    $scope.deleteGroups = function(group) {
        for (let i = 0; i < markedGroups.length; i++) {
            let index = $scope.groups.indexOf(markedGroups[i]);
            $scope.groups.splice(index, 1);
        }
        markedGroups = [];
    };
});

app.controller('postController', function($scope) {
    let user     = 'Lance Parantar';
    let postID   = 0;
    $scope.posts = [];

    $scope.addPost = function() {
        if (!$scope.content) {
            return;
        }
        $scope.posts.push({
            id:       postID++,
            user:     user,
            content:  $scope.content,
            time:     moment().format('MMMM D, YYYY - h:mm A'),
            likes:    0,
            dislikes: 0,
            hearts:   0
        });
    };

    $scope.addLikes = function(postIndex) {
        $scope.posts[postIndex].likes++;
    }

    $scope.addDislikes = function(postIndex) {
        $scope.posts[postIndex].dislikes++;
    }

    $scope.addHearts = function(postIndex) {
        $scope.posts[postIndex].hearts++;
    }
});


app.controller('birthdayController', function($scope, $http) {
    let API_ENDPOINT = "https://randomuser.me/api/?results=3";

    $http.get(API_ENDPOINT).then(function(response) {
        $scope.users = response.data.results;
    });
});

app.controller('friendsController', function($scope, $http) {
    let randNum       = Math.floor(Math.random() * 10) + 1;
    let API_ENDPOINT  = "https://randomuser.me/api/?results=" + randNum;
    $scope.isToggled  = true; // default state of the toggle button
    $scope.countUsers = randNum;

    $http.get(API_ENDPOINT).then(function(response) {
        $scope.onlineUsers = response.data.results;
    });
});
