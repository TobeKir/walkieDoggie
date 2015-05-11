angular.module('starter.controllers', [])

.controller('MitgliederCtrl', function($scope, Mitglieder) {
  $scope.mitglieder = Mitglieder.all();
})

.controller('MitgliederDetailCtrl', function($scope, $stateParams, Mitglieder) {
	$scope.mitglied = Mitglieder.get($stateParams.mitgliedId);
})

.controller('LoginCtrl', function($scope, Auth) {
	$scope.authRef = Auth;
	$scope.authRef.$authWithPassword({
email: "kirchner.to@gmail.com",
password: "1234"
}).then(function(authData) {
  console.log("Logged in as:", authData.uid);
}).catch(function(error) {
  console.error("Authentication failed:", error);
});
});