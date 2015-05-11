angular.module('starter.controllers', [])

.controller('TabCtrl', function($scope, $ionicModal, $timeout) {
  
  // Später Abfrage der Session, um Modal einzublenden
  $scope.isLoggedIn = true;

  // Form data for the login modal
  $scope.loginDaten = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/main/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.openLogin = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log("Login \n",
    "Email: ", $scope.loginDaten.email, "\n",
    "Passwort: ", $scope.loginDaten.passwort);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);

  };

  // Check if user is already logged in
  // Show Modal if is logged out
  $timeout(function() {
    if($scope.isLoggedIn == false){
      $scope.modal.show();
    }
  }, 1000);

})

.controller('RegistrierenCtrl', function($scope) {
  // Form data for the Register view
  $scope.loginDaten = {};

  // Simulate a Register delay. Remove this and replace with your Register
  // code if using a Register system
  $scope.doRegister = function() {
    console.log("Registrieren \n",
    "Vorname: ", $scope.loginDaten.vorname, "\n",
    "Nachname: ", $scope.loginDaten.nachname, "\n",
    "Email: ", $scope.loginDaten.email, "\n",
    "Passwort: ", $scope.loginDaten.passwort);
  };
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
});
