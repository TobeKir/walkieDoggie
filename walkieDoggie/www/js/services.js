angular.module('starter.services', ['firebase'])

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

.factory('User', ['$firebaseObject', '$firebaseArray', 'Auth', 'FBURL', function($firebaseObject, $firebaseArray, Auth, FBURL) {
  var ref = new Firebase(FBURL);
  var userRef = ref.child("users");
  return {
    all: function() {
      return $firebaseArray(userRef);
    },
    create: function(auth,userData) {
      return userRef.child(userData.uid).set(auth);
    },
    get: function(uid) {
      if (uid === undefined) {
        uid = Auth.getAuth().uid;
      }
      return $firebaseObject(userRef.child(uid));
    },
    save: function(user) {
      return user.$save();
    },
    allDogs: function(uid) {
      if (uid === undefined) {
        uid = Auth.getAuth().uid;
      }
      return $firebaseObject(userRef.child(uid).child("dogs"));
    },
    getDog: function(dogId, uid) {
      if (uid === undefined) {
        uid = Auth.getAuth().uid;
      }
      return $firebaseObject(userRef.child(uid).child("dogs").child(dogId));
    }

  }
}]);

