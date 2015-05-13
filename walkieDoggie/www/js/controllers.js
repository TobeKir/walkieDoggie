angular.module('starter.controllers', [])

.controller('AuthCtrl', function($scope, $state, $timeout, Auth) {
  
  // Später Abfrage der Session, um Login einzublenden
  $scope.UserIsLoggedIn = false;

  // Form data for the Login
  $scope.user = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(email,password) {
    Auth.$authWithPassword({
      email: email,
      password: password
    }).then(function(authData) {
      console.log("Nutzer " + email + " wurde eingeloggt");
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });

  };

  // Perform the register action when the user submits the register form
  $scope.doRegister = function(email,password) {
    Auth.$createUser({
      email: email, 
      password: password
    }).then(function() {
      console.log("Nutzer " + email + " wurde registriert");
      return $scope.doLogin(email,password);
    });
  };

  // Show Login if user is logged out
  $timeout(function() {
    if($scope.UserIsLoggedIn == false){
      // Login öffnen
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
