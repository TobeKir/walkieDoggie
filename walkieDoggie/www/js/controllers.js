angular.module('starter.controllers', [])

.controller('AuthCtrl', function($scope, $state, Auth, User) {

  $scope.auth = {};

  $scope.login = function() {
    Auth.login($scope.auth);
  };

  $scope.facebookConnect = function() {
    Auth.facebook();
  };

  $scope.register = function() {
    Auth.register($scope.auth).then(function(userData) {
      User.create($scope.auth, userData);
      Auth.login($scope.auth);
    });
  };

})

.controller('MitgliederCtrl', function($scope, $stateParams, User) {
  $scope.allUsers = User.all();

  $scope.userDetail = function(userId) {
    $scope.user = User.get(userId);
  }
})

// .controller('MitgliederDetailCtrl', function($scope, $stateParams, User) {
// 	$scope.mitglied = User.get($stateParams.mitgliedId);
// })

.controller('ProfilCtrl', function($scope, $stateParams, User, Dog, $ionicActionSheet, $cordovaCamera, $cordovaDatePicker, $timeout, $ionicHistory) {

  // Rudel
  $scope.allDogs = Dog.all();

  // Hunde Profil
  $scope.dogDetail = function(dogId) {
    $scope.dog = Dog.get(dogId);
  }

  $scope.edit = function(originScope) {
    $scope.editScope = {};
    angular.forEach(originScope, function(value, key) {
      this[key] = value;
    }, $scope.editScope);
  }

  $scope.save = function(originScope) {
    // Unterscheidung zwischen Bearbeitung oder Erstellung (nur existentes hat $id)
    if($scope.editScope.$id === undefined){
      Dog.add($scope.editScope);
    } else {
      angular.forEach($scope.editScope, function(value, key) {
        this[key] = value;
      }, originScope);
    
    // Unterscheidung Hund <-> Mensch (nur Hund hat Rasse)
    if($scope.editScope.name === undefined){
      User.save(originScope);
    } else {
      Dog.save(originScope);      
      }
    }

    $timeout(function() {
      $scope.allDogs = Dog.all(); 
    }, 300);
    
  }

  $scope.remove = function(originScope) {
    Dog.remove(originScope);
    $timeout(function() {
      $scope.allDogs = Dog.all(); 
    }, 300);
    // goBack to dogList
    $ionicHistory.goBack(-2);
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

})


.controller('MapCtrl', function($scope) {

        var myLatlng = new google.maps.LatLng(49.3716253, 9.1489621);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.SATELLITE
			/*mapTypeId: google.maps.MapTypeId.ROADMAP*/
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
            });
        });
		
		//some dummy markers
		var markerLocationArray = [];
		var markerUserArray = [];
		var markerPoisonArray = [];
		
		markerLocationArray.push(
		new google.maps.Marker({position: new google.maps.LatLng(49.1550,9.2220),map: map,type: "location",title: "Location 1"}),
		new google.maps.Marker({position: new google.maps.LatLng(49.1553,9.2223),map: map,type: "location",title: "Location 2"}),
		new google.maps.Marker({position: new google.maps.LatLng(49.1550,9.2223),map: map,type: "location",title: "Location 3"})
		);
		markerUserArray.push(
		new google.maps.Marker({position: new google.maps.LatLng(49.1540,9.2212),map: map,type: "user",title: "User 1"}),
		new google.maps.Marker({position: new google.maps.LatLng(49.1540,9.2215),map: map,type: "user",title: "User 2"}),
		new google.maps.Marker({position: new google.maps.LatLng(49.1538,9.2215),map: map,type: "user",title: "User 3"})
		);
		markerPoisonArray.push(
		new google.maps.Marker({position: new google.maps.LatLng(49.1540,9.2230),map: map,type: "poison",title: "Poisonbait 1"}),
		new google.maps.Marker({position: new google.maps.LatLng(49.1540,9.2228),map: map,type: "poison",title: "Poisonbait 2"}),
		new google.maps.Marker({position: new google.maps.LatLng(49.1538,9.2228),map: map,type: "poison",title: "Poisonbait 3"})
		);
		
		toggleLocationFilter = function(param){
		
			if(jQuery(param).hasClass("active")){
				markerLocationArray.forEach(function(marker){
					marker.setVisible(false);
				});
				jQuery(param).removeClass("active");
			}
			else {
				markerLocationArray.forEach(function(marker){
					marker.setVisible(true);
				});
				jQuery(param).addClass("active");
			}
		};
		toggleUserFilter = function(param){
			if(jQuery(param).hasClass("active")){
				markerUserArray.forEach(function(marker){
					marker.setVisible(false);
				});
				jQuery(param).removeClass("active");
			}
			else {
				markerUserArray.forEach(function(marker){
					marker.setVisible(true);
				});
				jQuery(param).addClass("active");
			}
		};
		togglePoisonFilter = function(param){
			if(jQuery(param).hasClass("active")){
				markerPoisonArray.forEach(function(marker){
					marker.setVisible(false);
				});
				jQuery(param).removeClass("active");
			}
			else {
				markerPoisonArray.forEach(function(marker){
					marker.setVisible(true);
				});
				jQuery(param).addClass("active");
			}
		};
		
        $scope.map = map;
})

.controller('ActivityCtrl', function($scope){
	$scope.activityRecording = false;
	$scope.activityRecordingPause = false;
	
	
	
	var activityLatlng = new google.maps.LatLng(49.3716253, 9.1489621);
 
        var activityMapOptions = {
            center: activityLatlng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.SATELLITE
			/*mapTypeId: google.maps.MapTypeId.ROADMAP*/
        };
		
	 var activityMap = new google.maps.Map(document.getElementById("activityMap"), activityMapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            activityMap.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myActivityLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: activityMap,
                title: "My Location"
            });
        });
	
	$scope.activityMap = activityMap;
})


.controller('LocationCtrl', function($scope, $stateParams, Location, $timeout){
    
    console.log('LocationController called');
    $scope.allLocations = Location.all();
    
    $scope.locationDetail = function(locationId){
        $scope.location = Location.get(locationId);
    }
    
//    $scope.createEditScope = function(){
//        $scope.editScope = {};
//    }
    
    $scope.edit = function(originScope) {
        $scope.editScope = {};
        angular.forEach(originScope, function(value, key) {
        this[key] = value;
        }, $scope.editScope);
    }

    $scope.save = function(originScope) {
        if($scope.editScope.$id === undefined){
            Location.create($scope.editScope);
        } else {
            angular.forEach($scope.editScope, function(value, key) {
                this[key] = value;
            }, originScope);
            Location.save(originScope);
        }

        $timeout(function() {
          $scope.allLocations = Location.all(); 
        }, 300);
    }
});

//.controller('LocationCreateCtrl', function($scope, $state, $stateParams, Location){
//    $scope.location = {};
//    
//    var location = {};
//    location.type  = $scope.type;
//    location.title = $scope.title;
//    location.latitude  = $scope.latitude;
//    location.longitude = $scope.longitude;
//    location.description = $scope.description;
//    
//    $scope.create = function(){
//        Location.create(location);
//    };
//});








