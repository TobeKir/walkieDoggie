angular.module('starter.services', ['firebase'])

.factory('Mitglieder', ['FBURL', '$firebaseArray', '$firebaseObject', function(FBURL, $firebaseArray, $firebaseObject) {

  var ref = new Firebase(FBURL);
  var users = $firebaseArray(ref.child("users"));

  return {
    all: function() {
      return users;
    }
  };
}])

.factory('Auth', ['$firebaseAuth', 'FBURL', function($firebaseAuth, FBURL) {
  var ref = new Firebase(FBURL);
  var auth = $firebaseAuth(ref);
  return {
    register: function (user) {
      return auth.$createUser({
        email: user.email, 
        password: user.password
    });
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

.factory('User', ['$firebaseObject','Auth', 'FBURL', function($firebaseObject, Auth, FBURL) {
  var ref = new Firebase(FBURL);
  return {
    create: function(auth,userData) {
      return ref.child("users").child(userData.uid).set(auth);
    },
    get: function(uid) {
      if (uid === undefined) {
        uid = Auth.getAuth().uid;
      }
      return $firebaseObject(ref.child("users").child(uid));
    },
    save: function(user) {
      return user.$save();
    }
  }
}]);

