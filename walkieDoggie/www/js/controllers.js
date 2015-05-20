angular.module('starter.controllers', [])

.controller('AuthCtrl', function($scope, $state, $timeout, Auth, User) {

  $scope.auth = {};

  $scope.doLogin = function() {
    Auth.login($scope.auth).then(function(authData) {
      console.log("Nutzer " + authData.uid + " wurde eingeloggt");
      $state.go('tab.feed.alle');
      console.log("Weiterleitung auf den Feed");
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };

  $scope.doFacebookConnect = function() {
    Auth.facebook()
    .then(function(authData) {
      $state.go('tab.feed.alle');
      console.log(authData);
    }).catch(function(error) {
      console.log("Authentication failed:", error);
    });
  };

  $scope.doRegister = function() {
    Auth.register($scope.auth).then(function(userData) {
      User.create($scope.auth, userData);
      console.log("Nutzer " + userData.uid + " wurde registriert");
      return $scope.doLogin();
    });
  };

})

.controller('MitgliederCtrl', function($scope, $stateParams, User) {
  $scope.allUsers = User.all();
  $scope.user = User.get($stateParams.userId);
})

// .controller('MitgliederDetailCtrl', function($scope, $stateParams, User) {
// 	$scope.mitglied = User.get($stateParams.mitgliedId);
// })

.controller('ProfilCtrl', function($rootScope, $scope, User) {

  $rootScope.user = User.get();
  $scope.editUser = {};

  $scope.isProfil = true;

  $scope.edit = function() {
    angular.forEach($rootScope.user, function(value, key) {
      this[key] = value;
    }, $scope.editUser);
  }

  $scope.changePhoto = function() {

  }

  $scope.save = function() {
    angular.forEach($scope.editUser, function(value, key) {
      this[key] = value;
    }, $rootScope.user);
    User.save($rootScope.user);
  }

})
