// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $state, $rootScope, Auth, User) {
  $ionicPlatform.ready(function() {
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
    } else {
      $rootScope.user = User.get();
    }

  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {

  $stateProvider

  .state('tab', {
    abstract: true,
    templateUrl: "templates/main/tabs.html"
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
    views: {
      'tab-standort': {
        abstract: true,
        templateUrl: 'templates/tabs/tab-standort.html'
      }
    }
  }).state('tab.standort.liste', {
    url: '/liste',
    views: {
      'standort-liste': {
        abstract: true,
        templateUrl: 'templates/tab-standort/standort-liste.html',
        controller: 'LocationCtrl'
      }
    }
  }).state('tab.standort.liste-ort-detail', {
    url: '/location/:locationId',
    // params: {locationId:{}},
    views: {
      'standort-liste': {
        templateUrl: 'templates/shared/location-detail.html'
      }
    }
  }).state('tab.standort.liste-ort-edit', {
    url: '/location/edit',
    views: {
      'standort-liste': {
        templateUrl: 'templates/shared/location-edit.html'
      }
    }
  }).state('tab.standort.liste-ort-add', {
    url: '/location/add',
    views: {
      'standort-liste': {
        templateUrl: 'templates/shared/location-edit.html'
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
  }).state('tab.feed', {
    url: '/feed',
    views: {
      'tab-feed': {
        abstract: true,
        templateUrl: 'templates/tabs/tab-feed.html'
      }
    }
  }).state('tab.feed.alle', {
    url: '/alle',
    views: {
      'feed-alle': {
        templateUrl: 'templates/tab-feed/feed-alle.html'
      }
    }
  }).state('tab.feed.ich', {
    url: '/ich',
    views: {
      'feed-ich': {
        templateUrl: 'templates/tab-feed/feed-ich.html'
      }
    }
  })

  .state('tab.aktivitaet', {
    url: '/aktivitaet',
    views: {
      'tab-aktivitaet': {
        templateUrl: 'templates/tabs/tab-aktivitaet.html'
      }
    }
  })

  .state('tab.mitglieder', {
    url: '/mitglieder',
    views: {
      'tab-mitglieder': {
        abstract: true,
        templateUrl: 'templates/tabs/tab-mitglieder.html'
      }
    }
  }).state('tab.mitglieder.alle', {
    url: '/alle',
    views: {
      'mitglieder-alle': {
        templateUrl: 'templates/tab-mitglieder/mitglieder-alle.html',
        controller: 'MitgliederCtrl'
      }
    }
  }).state('tab.mitglieder.alle-detail', {
    url: '/alle/:userId',
    // params: {mitgliedId:{}},
    views: {
      'mitglieder-alle': {
        templateUrl: 'templates/shared/user-detail.html',
        controller: 'MitgliederCtrl'
      }
    }
  }).state('tab.mitglieder.freunde', {
    url: '/freunde',
    views: {
      'mitglieder-freunde': {
        templateUrl: 'templates/tab-mitglieder/mitglieder-freunde.html',
        controller: 'MitgliederCtrl'
      }
    }
  }).state('tab.mitglieder.freunde-detail', {
    url: '/freunde/:userId',
    views: {
      'mitglieder-freunde': {
        templateUrl: 'templates/shared/user-detail.html',
        controller: 'MitgliederCtrl'
      }
    }
  })

  .state('tab.profil', {
    url: '/profil',
    views: {
      'tab-profil': {
        abstract: true,
        templateUrl: 'templates/tabs/tab-profil.html',
        controller: 'ProfilCtrl'
      }
    }
  }).state('tab.profil.ich', {
    url: '/ich',
    views: {
      'profil-ich': {
        templateUrl: 'templates/shared/user-detail.html'
      }
    }
  }).state('tab.profil.ich-edit', {
    url: '/ich/edit',
    views: {
      'profil-ich': {
        templateUrl: 'templates/shared/user-edit.html'
      }
    }
  }).state('tab.profil.rudel', {
    url: '/rudel',
    views: {
      'profil-rudel': {
        templateUrl: 'templates/shared/user-dogs.html'
      }
    }
  }).state('tab.profil.rudel-detail', {
    url: '/rudel/detail',
    views: {
      'profil-rudel': {
        templateUrl: 'templates/shared/dog-detail.html'
      }
    }
  }).state('tab.profil.rudel-edit', {
    url: '/rudel/edit',
    views: {
      'profil-rudel': {
        templateUrl: 'templates/shared/dog-edit.html'
      }
    }
  }).state('tab.profil.rudel-add', {
    url: '/rudel/add',
    views: {
      'profil-rudel': {
        templateUrl: 'templates/shared/dog-edit.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/feed/alle');
  $urlRouterProvider.otherwise('/feed/alle');

  // Tab Position for Android
  $ionicConfigProvider.tabs.position("bottom");

  // White List für a href
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);


});
