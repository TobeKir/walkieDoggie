angular.module('starter.controllers', [])

.controller('AuthCtrl', function($scope, $state, $timeout, Auth, User) {

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
      User.create($scope.auth, userData);
      console.log("Nutzer " + userData.uid + " wurde registriert");
      return $scope.doLogin();
    });
  };

})

.controller('MitgliederCtrl', function($scope, $stateParams, User) {
  $scope.mitglieder = User.all();
})

.controller('MitgliederDetailCtrl', function($scope, $stateParams, User) {
	$scope.mitglied = User.get($stateParams.mitgliedId);
})

.controller('ProfilCtrl', function($rootScope, $scope, User, $ionicActionSheet, $cordovaCamera) {

  $rootScope.user = User.get();

  $scope.edit = function(user) {
    $scope.editUser = User.get();
  }

  $scope.changePhoto = function() {

    var sel = $ionicActionSheet.show({
       buttons: [
         { text: 'Neues Bild aufnehmen' },
         { text: 'Bild auswählen' }
       ],
       titleText: 'Profilbild wählen',
       cancelText: 'Abbrechen',
       cancel: function() {
            // blabla
          },
       buttonClicked: function(index) {
         switch (index){
              case 0 :
                $scope.sourceType = Camera.PictureSourceType.CAMERA;
                $scope.getPicture();
                return true;
              case 1 :
                $scope.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
                $scope.getPicture();
                return true;
            }
       }
    });
    
  $scope.getPicture = function(){
    var options = {
        quality : 75,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : $scope.sourceType,
        allowEdit : true,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        targetWidth: 100,
        targetHeight: 100,
        saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
        $rootScope.user.image = imageData;
        User.save($rootScope.user);
    });
  };
}

  $scope.save = function() {
    angular.forEach($scope.editUser, function(value, key) {
      this[key] = value;
    }, $rootScope.user);
    User.save($rootScope.user);
  }
})
