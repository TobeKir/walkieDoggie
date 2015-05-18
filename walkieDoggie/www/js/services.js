angular.module('starter.services', ['firebase'])

.factory('Mitglieder', ['$firebaseArray', function($firebaseArray) {

  var ref = new Firebase("https://boiling-torch-520.firebaseio.com/");

  return {
    all: function() {
      return $firebaseArray(ref.child("users"));
    },
    get: function(mitgliedId) {
      for (var i = 0; i < mitglieder.length; i++) {
        if (mitglieder[i].id === parseInt(mitgliedId)) {
          return mitglieder[i];
        }
      }
      return null;
    }
  };
}])

.factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
  var ref = new Firebase("https://boiling-torch-520.firebaseio.com/");
  var auth = $firebaseAuth(ref);
  return {
    register: function (user) {
      return auth.$createUser({
        email: user.email, 
        password: user.password
    });
    },
    createProfile: function(user,userData) {
      return ref.child("users").child(userData.uid).set(auth);
    },
    login: function (user) {
      return auth.$authWithPassword({
        email: user.email, 
        password: user.password
      });
    },
    facebook: function() {
      return auth.$authWithOAuthPopup("facebook");
    },
    logout: function () {
      return auth.$unauth();
    },
    getAuth: function() {
      return auth.$getAuth();
    }
  };
}])

.factory('User', ['$firebaseObject','Auth', function($firebaseObject, Auth) {
  var ref = new Firebase("https://boiling-torch-520.firebaseio.com/");
  return {
    getUser: function() {
      return $firebaseObject(ref.child("users").child(Auth.getAuth().uid));
    },
  }
}]);

