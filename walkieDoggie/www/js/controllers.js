angular.module('starter.controllers', [])

.controller('AuthCtrl', function($scope, $state, $timeout, Auth) {

  $scope.auth = {};

  // perfrom the login action when the user submits the login form
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

  // perform the register action when the user submits the register form
  $scope.doRegister = function() {
    Auth.register($scope.auth).then(function(userData) {
      Auth.createProfile($scope.auth, userData);
      console.log("Nutzer " + userData.uid + " wurde registriert");
      return $scope.doLogin();
    });
  };

})

.controller('MitgliederCtrl', function($scope, $stateParams, Mitglieder) {
  // if($stateParams.viewFreunde) {
  //   $scope.mitglieder = Mitglieder.freunde();
  // } else {
  //   $scope.mitglieder = Mitglieder.all();
  // }
  $scope.mitglieder = Mitglieder.all();
})

.controller('MitgliederDetailCtrl', function($scope, $stateParams, Mitglieder) {
	$scope.mitglied = Mitglieder.get($stateParams.mitgliedId);
})

.controller('ProfilCtrl', function($rootScope, User, $scope) {
  
  $rootScope.user = User.getUser();

  $scope.save = function() {
    User.saveUser($rootScope.user);
  }
})
