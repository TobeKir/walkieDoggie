// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'timer'])

.run(function($ionicPlatform, $state, $rootScope, Auth, User) {
  $ionicPlatform.ready(function() {

    if(window.Connection) {
                   if(navigator.connection.type == Connection.NONE) {
                       $ionicPopup.confirm({
                           title: "Internet Disconnected",
                           content: "The internet is disconnected on your device."
                       })
                       .then(function(result) {
                           if(!result) {
                               ionic.Platform.exitApp();
                           }
                       });
                   }
               };
               
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    // show current state in view
    $rootScope.state = $state;

    // lead User to login-page if not signed in
    if(!Auth.getAuth()){
      $state.go('login');
    } 
    else {
      $rootScope.user = User.get();
    }

  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {

  $stateProvider

  .state('tab', {
    abstract: true,
    templateUrl: "templates/main/tabs.html",
  })

  .state('login', {
    url: '/login',
    templateUrl: "templates/main/login.html",
    controller: 'AuthCtrl'
  })

  .state('registrieren', {
    url: '/registrieren',
    templateUrl: "templates/main/registrieren.html",
    controller: 'AuthCtrl'
  })

  .state('tab.standort', {
    url: '/standort',
    abstract: true,
    views: {
      'tab-standort': {
        templateUrl: 'templates/tabs/tab-standort.html',
        controller: 'LocationCtrl'
      }
    }
  }).state('tab.standort.karte', {
    url: '/karte',
    views: {
      'standort-karte': {
        templateUrl: 'templates/tab-standort/standort-karte.html',
        controller: 'MapCtrl'
      }
    }
  }).state('tab.standort.karte-detail', {
    url: '/karte/detail',
    params: {locationId : {}},
    views: {
      'standort-karte': {
        templateUrl: 'templates/shared/location-detail.html',
        controller: 'LocationCtrl'
      }
    }
  }).state('tab.standort.liste', {
    url: '/liste',
    views: {
      'standort-liste': {
        templateUrl: 'templates/tab-standort/standort-liste.html',
      }
    }
  }).state('tab.standort.ort-detail', {
    url: '/location/detail',
    views: {
      'standort-liste': {
        templateUrl: 'templates/shared/location-detail.html'
      }
    }
  }).state('tab.standort.ort-edit', {
    url: '/location/edit',
    views: {
      'standort-liste': {
        templateUrl: 'templates/shared/location-edit.html'
      }
    }
  }).state('tab.standort.ort-add', {
    url: '/location/add',
    views: {
      'standort-liste': {
        templateUrl: 'templates/shared/location-edit.html'
      }
    }
  }).state('tab.feed', {
    url: '/feed',
    views: {
      'tab-feed': {
        templateUrl: 'templates/tab-feed/feed.html'
      }
    }
  })


    .state('tab.aktivitaet', {
    url: '/aktivitaet',
    abstract: true,
    views: {
      'tab-aktivitaet': {
        templateUrl: 'templates/tabs/tab-aktivitaet.html'
      }
    }
  }).state('tab.aktivitaet.live', {
    url: '/live',
    views: {
      'aktivitaet-live': {
        templateUrl: 'templates/tab-aktivitaet/aktivitaet-live.html',
		    controller: 'ActivityCtrl'
      }
    }
  }).state('tab.aktivitaet.statistik', {
    url: '/statistik',
    views: {
      'aktivitaet-statistik': {
        templateUrl: 'templates/tab-aktivitaet/aktivitaet-statistik.html'
      }
    }
  })

  .state('tab.mitglieder-liste', {
    url: '/mitglieder',
    views: {
      'tab-mitglieder': {
        templateUrl: 'templates/tab-mitglieder/mitglieder.html',
        controller: 'MitgliederCtrl'
      }
    },
    resolve: {
      memberData: function(User, $ionicLoading) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
          noBackdrop: true,
          duration: 2000
        });
        return User.all().$loaded().then(function(data){
          return {members:data};
        });
      }
    }
  }).state('tab.mitglieder-profil', {
    url: '/mitglieder/profil',
    params: {userId : {}},
    views: {
      'tab-mitglieder': {
        templateUrl: 'templates/shared/user-detail.html',
        controller: 'ProfilCtrl'
      }
    },
    resolve: {
      userData: function(User, $stateParams, $ionicLoading) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
          noBackdrop: true
        });
        return User.get($stateParams.userId).$loaded().then(function(data){
          return {user:data};
        });
      }
    }
  }).state('tab.mitglieder-profil-dog', {
    url: '/mitglieder/profil/dog',
    params: {dogId : {}},
    views: {
      'tab-mitglieder': {
        templateUrl: 'templates/shared/dog-detail.html',
        controller: 'DogCtrl'
      }
    }
  })

  .state('tab.profil', {
    url: '/profil',
    cache: false,
    views: {
      'tab-profil': {
        templateUrl: 'templates/shared/user-detail.html',
        controller: 'ProfilCtrl'
      }
    },
    resolve: {
      userData: function(User, $stateParams, $ionicLoading) {
        $ionicLoading.show({
          template: '<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
          noBackdrop: true
        });
        return User.get($stateParams.userId).$loaded().then(function(data){
          return {user:data};
        });
      }
    }
  }).state('tab.profil-edit', {
    url: '/profil/edit',
    views: {
      'tab-profil': {
        templateUrl: 'templates/shared/user-edit.html',
        controller: 'EditCtrl'
      }
    }
  }).state('tab.profil-dog', {
    url: '/profil/dog/',
    params: {dogId : {}},
    views: {
      'tab-profil': {
        templateUrl: 'templates/shared/dog-detail.html',
        controller: 'DogCtrl'
      }
    }
  }).state('tab.profil-dog-edit', {
    url: '/profil/dog/edit',
    views: {
      'tab-profil': {
        templateUrl: 'templates/shared/dog-edit.html',
        controller: 'EditCtrl'
      }
    }
  }).state('tab.profil-dog-add', {
    url: '/profil/dog/add',
    views: {
      'tab-profil': {
        templateUrl: 'templates/shared/dog-edit.html',
        controller: 'EditCtrl'
      }
    }
  }).state('tab.einstellungen', {
    url: '/einstellungen',
    views: {
      'tab-profil': {
        templateUrl: 'templates/main/einstellungen.html',
        controller: 'AuthCtrl'
      }
    }
  }).state('tab.rechtliches', {
    url: '/einstellungen/rechtliches',
    views: {
      'tab-profil': {
        templateUrl: 'templates/einstellungen/rechtliches.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/feed/alle');
  $urlRouterProvider.otherwise('/profil');

  // Tab Position for Android
  $ionicConfigProvider.tabs.position("bottom");

  // White List für a href
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);


});
