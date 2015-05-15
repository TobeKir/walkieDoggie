// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $state, $rootScope, Auth) {
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
    $rootScope.state = $state;

    if(!Auth.getAuth()){
      $state.go('login');
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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
        templateUrl: 'templates/tab-standort/standort-liste.html'
      }
    }
  }).state('tab.standort.karte', {
    url: '/karte',
    views: {
      'standort-karte': {
        templateUrl: 'templates/tab-standort/standort-karte.html'
      }
    }
  })

  .state('tab.feed', {
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
  }).state('tab.mitglieder.freunde', {
    // params: {viewFreunde: true },
    url: '/freunde',
    views: {
      'mitglieder-freunde': {
        templateUrl: 'templates/tab-mitglieder/mitglieder-freunde.html',
        controller: 'MitgliederCtrl'
      }
    }
  }).state('tab.mitglieder.alle-detail', {
    url: '/alle/:mitgliedId',
    params: {mitgliedId:{}},
    views: {
      'mitglieder-alle': {
        templateUrl: 'templates/tab-mitglieder/mitglieder-detail.html',
        controller: 'MitgliederDetailCtrl'
      }
    }
  }).state('tab.mitglieder.freunde-detail', {
    url: '/freunde/:mitgliedId',
    params: {mitgliedId:{}},
    views: {
      'mitglieder-freunde': {
        templateUrl: 'templates/tab-mitglieder/mitglieder-detail.html',
        controller: 'MitgliederDetailCtrl'
      }
    }
  })

  .state('tab.profil', {
    url: '/profil',
    views: {
      'tab-profil': {
        templateUrl: 'templates/tabs/tab-profil.html',
        controller: 'ProfilCtrl'
      }
    }
  }).state('tab.profil.ich', {
    url: '/ich',
    views: {
      'profil-ich': {
        templateUrl: 'templates/tab-profil/profil-ich.html'
      }
    }
  }).state('tab.profil.rudel', {
    url: '/rudel',
    views: {
      'profil-rudel': {
        templateUrl: 'templates/tab-profil/profil-rudel.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/feed/alle');
  $ionicConfigProvider.tabs.position("bottom");


});
