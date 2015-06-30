angular.module('starter.controllers', [])

.controller('AuthCtrl', function($scope, $rootScope, $state, Auth, User, $ionicLoading) {

  $scope.auth = {};

  $scope.login = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
      noBackdrop: true
    });
    Auth.login($scope.auth).then(function(authData) {
          $state.go('tab.profil');
          $rootScope.user = User.get(authData.uid);
      }).catch(function(error) {
          console.error("Authentication failed:", error);
          $ionicLoading.hide();
      });
  };

  // $scope.facebookConnect = function() {
  //   Auth.facebook();
  // };

  $scope.register = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
      noBackdrop: true
    });
    Auth.register($scope.auth).then(function(userData) {
      Auth.login($scope.auth).then(function(authData){
        User.create($scope.auth, authData);
        $state.go('tab.profil');
      }).catch(function(error){

        })
    }).catch(function(error){

      })
  };

  $scope.logout = function() {
    Auth.logout();
    $state.go('login');
  };

})

.controller('MitgliederCtrl', function($scope, memberData, $ionicLoading) {
  
  $scope.allUsers = memberData.members;
  $ionicLoading.hide();

})

.controller('ProfilCtrl', function($scope, $stateParams, $state, userData, User, Dog, $ionicLoading){

  $scope.user = userData.user;
  $ionicLoading.hide();
  $scope.userDogs = Dog.all();

})

.controller('DogCtrl', function($scope, Dog, $stateParams, $rootScope){

  $rootScope.dog = Dog.get($stateParams.dogId);

})

.controller('EditCtrl', function($scope, $rootScope, $state, User, Dog, $ionicActionSheet, $cordovaCamera, $cordovaDatePicker, $timeout, $ionicHistory) {

  var originScope = {};

  if($state.includes('tab.profil-edit')){
    originScope = $rootScope.user;
  } else if($state.includes('tab.profil-dog-edit')){
    originScope = $rootScope.dog;
  } 

  $scope.editScope = {};
  angular.forEach(originScope, function(value, key) {
    this[key] = value;
  }, $scope.editScope);

  $scope.save = function(originScope) {
    // Unterscheidung zwischen Bearbeitung oder Erstellung (nur existentes hat $id)
    if($state.includes('tab.profil-dog-add')){
      $scope.editScope.ownerId = $rootScope.user.$id;
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
      $ionicHistory.goBack(-2);      
      }
    }
    
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
        $scope.editScope.image = imageData;
      });
    };
  }

  $scope.datePicker = function() {
    var options = {
      date: new Date($scope.editScope.geburtsdatum),
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
       $scope.editScope.geburtsdatum = date.toJSON();
   });
  }

})

.controller('MapCtrl', function($scope, $cordovaGeolocation, Location) {
        var myLatlng = new google.maps.LatLng(49.3716253, 9.1489621);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
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
		
        //Getting all Locations from Firebase
        var allLocations = Location.all();
        console.log( allLocations );
    
        var allLocations = allLocations.$loaded().then(function (value){
            for (i = 0; i < value.length; i++){
                var markerType = getMarkerType(value[i].typ);
                var mapMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(value[i].latitude, value[i].longitude),
                    map: map,
                    type: markerType,
                    title: value[i].title
                });
				google.maps.event.addListener(mapMarker, 'click', function() {
					//DIRECT TO DETAIL SITE HANNES
					alert(mapMarker.title);
				  });
                if( markerType == 'poison' ){ 
                    markerPoisonArray.push( mapMarker ); 
                } else { 
                    markerLocationArray.push( mapMarker ); 
                }
            }
        });
    
        function getMarkerType( locationType ){
            if (locationType == 'Giftköder'){
                return 'poison';
            }else{
                return 'location';
            }
        }

		markerUserArray.push(
		new google.maps.Marker({position: new google.maps.LatLng(49.1540,9.2212),map: map,type: "user",title: "User 1"}),
		new google.maps.Marker({position: new google.maps.LatLng(49.1540,9.2215),map: map,type: "user",title: "User 2"}),
		new google.maps.Marker({position: new google.maps.LatLng(49.1538,9.2215),map: map,type: "user",title: "User 3"})
		);
		
		/* testMarker for marker click listener
		var testMarker = new google.maps.Marker({position: new google.maps.LatLng(49.1536,9.2210),map: map,type: "location",title: "User 3"});
		google.maps.event.addListener(testMarker, 'click', function() {
					//DIRECT TO DETAIL SITE HANNES
					alert(testMarker.title);
				  });
		markerUserArray.push(testMarker);*/
	
	
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
		// toggleUserFilter = function(param){
		// 	if(jQuery(param).hasClass("active")){
		// 		markerUserArray.forEach(function(marker){
		// 			marker.setVisible(false);
		// 		});
		// 		jQuery(param).removeClass("active");
		// 	}
		// 	else {
		// 		markerUserArray.forEach(function(marker){
		// 			marker.setVisible(true);
		// 		});
		// 		jQuery(param).addClass("active");
		// 	}
		// };
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

.controller('ActivityCtrl', function($scope, $cordovaGeolocation, $ionicPopup){
	var activityLatlng = new google.maps.LatLng(49.3716253, 9.1489621);
 
        var activityMapOptions = {
            center: activityLatlng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
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
	
	$scope.timerRunning = false;
	$scope.activityRecordingPause = false;
	$scope.activityTime = 0;
	$scope.routeLength = 0;
	
	var watch_id = null;
	var tracking_data = [];
	var activityRoute;
	
	$scope.startTimer = function (){
		$scope.$broadcast('timer-start');
		$scope.timerRunning = true;
		
		watch_id = navigator.geolocation.watchPosition(
			// Success
			function(pos){
				//$scope.tracking_data.push(position);
				tracking_data.push(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
				$scope.routeLength = (Math.round((google.maps.geometry.spherical.computeLength(activityRoute.getPath().getArray())*100)/100))/1000;
				console.log($scope.routeLength);
				console.log(tracking_data);
			},
			 
			// Error
			function(error){
				$ionicPopup.alert({
					 title: 'Cordova Geolocation Debugging:',
					 template: error
				   });
			
				console.log(error);
			},
			 
			// Settings
			{ frequency: 5000, enableHighAccuracy: true }
		);
		
		//dummy polyline data
		//removed for testing tracking_data.push(new google.maps.LatLng(49.1550,9.2220),new google.maps.LatLng(49.1540,9.2212),new google.maps.LatLng(49.1540,9.2230));
		
		activityRoute = new google.maps.Polyline({
			path: tracking_data,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 6
		});
		
		activityRoute.setMap(activityMap);
	};
	
	$scope.resumepauseTimer = function (){
		if ($scope.activityRecordingPause == true){
			$scope.$broadcast('timer-resume');
			//$scope.timerRunning = true;
			$scope.activityRecordingPause = false;
		}
		else{
			$scope.$broadcast('timer-stop');
			//$scope.timerRunning = false;
			$scope.activityRecordingPause = true;
		}
	};
	
	$scope.endTimer = function (){
		$scope.$broadcast('timer-stop');
		$scope.timerRunning = false;
		console.log('Finished - data = ', tracking_data);
		
		alert("Exit?");
		//save route HIER HANNES activityRoute enthält die route
		
		navigator.geolocation.clearWatch(watch_id);
		tracking_data = [];
		activityRoute.setMap(null);
	};
	
	$scope.abortTimer = function (){
		//clearing time not working yet
		$scope.$broadcast('timer-reset');
		$scope.timerRunning = false;
		navigator.geolocation.clearWatch(watch_id);
		tracking_data = [];
		activityRoute.setMap(null);
		$scope.routeLength = 0;
	};
 
	$scope.$on('timer-stopped', function (event, data){
		console.log('Timer Stopped - data = ', data);
		$scope.activityTime = data;
	});
	
	
})


.controller('LocationCtrl', function($scope, $stateParams, Location, $timeout, $ionicActionSheet, $cordovaCamera){
    
    $scope.allLocations = Location.all();
    
    $scope.locationDetail = function(locationId){
        $scope.location = Location.get(locationId);
    }
    
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
    
    $scope.getCssClass = function(locationType){
        if(locationType == 'Ausbildung'){
            return 'education';
        }else if (locationType == 'Betreuung & Pflege'){
            return 'care';
        }else if (locationType == 'Gesundheit'){
            return 'health';
        }else if (locationType == 'Hundefreundliche Orte'){
            return 'dog-friendly';
        }else if (locationType == 'Hundeklo'){
            return 'dog-toilet';
        }else if (locationType == 'Shopping'){
            return 'shopping';
        }else if (locationType == 'Spielen & Gassi gehen'){
            return 'games';
        }else if (locationType == 'Giftköder'){
            return 'poison';
        }else if (locationType == 'Sonstiges'){
            return 'other';
        }else{
            return 'basic';
        }
    }
    
    $scope.changePhoto = function() {

        var sourceType;
        $ionicActionSheet.show({
          buttons: [
            { text: 'Neues Bild aufnehmen' },
            { text: 'Bild auswählen' }
          ],
          titleText: 'Ortsbild ändern',
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
            $scope.editScope.image = imageData;
          });
        };
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








