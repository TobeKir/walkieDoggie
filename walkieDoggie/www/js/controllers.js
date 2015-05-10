angular.module('starter.controllers', [])

.controller('MitgliederCtrl', function($scope, Mitglieder) {
  $scope.mitglieder = Mitglieder.all();
})

.controller('MitgliederDetailCtrl', function($scope, $stateParams, Mitglieder) {
	$scope.mitglied = Mitglieder.get($stateParams.mitgliedId);
});