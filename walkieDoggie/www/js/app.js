// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
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
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    abstract: true,
    templateUrl: "templates/main/tabs.html"
  })

  // Each tab has its own nav history stack:
  .state('login', {
    url: '/login',
    templateUrl: "templates/main/login.html"
  })

  .state('registrieren', {
    url: '/registrieren',
    templateUrl: "templates/main/registrieren.html"
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
  }).state('tab.mitglieder.alle.detail', {
    url: '/detail/:mitgliedId',
    views: {
        'mitglieder-alle@tab.mitglieder': {
        templateUrl: 'templates/tab-mitglieder/mitglieder-detail.html',
        controller: 'MitgliederDetailCtrl'
      }
    }
  }).state('tab.mitglieder.freunde', {
    url: '/freunde',
    views: {
      'mitglieder-freunde': {
        templateUrl: 'templates/tab-mitglieder/mitglieder-freunde.html'
      }
    }
  })

  .state('tab.profil', {
    url: '/profil',
    views: {
      'tab-profil': {
        templateUrl: 'templates/tabs/tab-profil.html',
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/feed');
  $ionicConfigProvider.tabs.position("bottom");


});
