angular.module('starter.controllers', [])

.controller('AuthCtrl', function($scope, $state, $timeout, Auth) {
  
  // später Abfrage der Session, um Login einzublenden
  $scope.UserIsLoggedIn = false;

  // Fform data for the login
  $scope.user = {};

  // perfrom the login action when the user submits the login form
  $scope.doLogin = function(email,password) {
    Auth.$authWithPassword({
      email: email,
      password: password
    }).then(function(authData) {
      console.log("Nutzer " + email + " wurde eingeloggt");
      $state.go('tab.feed.alle');
      console.log("Weiterleitung auf den Feed");
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });

  };

  // perform the register action when the user submits the register form
  $scope.doRegister = function(email,password) {
    Auth.$createUser({
      email: email, 
      password: password
    }).then(function() {
      console.log("Nutzer " + email + " wurde registriert");
      return $scope.doLogin(email,password);
    });
  };

  // show login if user is logged out
  $timeout(function() {
    if($scope.UserIsLoggedIn == false){
      // show login
    }
  }, 1000);

})

.controller('MitgliederCtrl', function($scope, $stateParams, Mitglieder) {
  if($stateParams.viewFreunde) {
    // get Freunde
    // $scope.mitglieder = Mitglieder.freunde();
  } else {
    $scope.mitglieder = Mitglieder.all();
  }
})

.controller('MitgliederDetailCtrl', function($scope, $stateParams, Mitglieder) {
	$scope.mitglied = Mitglieder.get($stateParams.mitgliedId);
})
