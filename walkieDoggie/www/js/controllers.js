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

.controller('ProfilCtrl', function($rootScope, $scope, User, $ionicActionSheet, $cordovaCamera, $cordovaDatePicker) {

  $rootScope.user = User.get();
  $scope.editUser = {};

  $scope.isProfil = true;

  $scope.edit = function() {
    angular.forEach($rootScope.user, function(value, key) {
      this[key] = value;
    }, $scope.editUser);
  }

  $scope.changePhoto = function() {

    var sourceType;
    
    $ionicActionSheet.show({
      buttons: [
        { text: 'Neues Bild aufnehmen' },
        { text: 'Bild auswählen' }
      ],
      titleText: 'Profilbild ändern',
      cancelText: 'Abbrechen',
      buttonClicked: function(index) {
        switch (index) {
          case 0 :
            sourceType = Camera.PictureSourceType.CAMERA;
            getPicture(sourceType);
            return true;
          case 1 :
            sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
            getPicture(sourceType);
            return true;
          }
      }
    });
    
    function getPicture(sourceType) {
      var options = {
        quality : 70,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : sourceType,
        allowEdit : true,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        targetWidth: 100,
        targetHeight: 100,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.editUser.image = imageData;
      });
    };
  }

  $scope.datePicker = function() {
    var options = {
      date: new Date($scope.editUser.geburtsdatum),
      mode: 'date', // or 'time' // TIME HERE
      minDate: new Date() - 10000,
      allowOldDates: true,
      allowFutureDates: false,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#F2F3F4',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    };

   $cordovaDatePicker.show(options).then(function (date) {
       $scope.editUser.geburtsdatum = date.toJSON();
   });
  }

  $scope.save = function() {
    angular.forEach($scope.editUser, function(value, key) {
      this[key] = value;
    }, $rootScope.user);
    User.save($rootScope.user);
  }

})

.controller('DogCtrl', function($scope, $stateParams, User) {
  $scope.allDogs = User.allDogs();
  console.log($scope.allDogs); 
  // $scope.user = User.get($stateParams.userId);
})











