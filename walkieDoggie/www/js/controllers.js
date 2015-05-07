angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope) {
	
})

.controller('FeedCtrl', function($scope) {

})

.controller('MembersCtrl', function($scope, Members) {
  $scope.members = Members.all();
  $scope.remove = function(member) {
    Members.remove(member);
  }
})

.controller('MemberDetailCtrl', function($scope, $stateParams, Members) {
  $scope.member = Members.get($stateParams.memberId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
