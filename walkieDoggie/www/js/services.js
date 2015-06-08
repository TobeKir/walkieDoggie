angular.module('starter.services', ['firebase'])

.constant('FBURL', 'https://boiling-torch-520.firebaseio.com/')

.factory('Auth', ['$firebaseAuth', 'FBURL', '$state', function($firebaseAuth, FBURL, $state) {
  var ref = new Firebase(FBURL);
  var auth = $firebaseAuth(ref);
  return {
    register: function (user) {
      return auth.$createUser({
        email: user.email, 
        password: user.password
      })
    },
    login: function (user) {
      return auth.$authWithPassword({
        email: user.email, 
        password: user.password
      }).then(function(authData) {
          console.log("Nutzer " + authData.uid + " wurde eingeloggt");
          $state.go('tab.feed.alle');
          console.log("Weiterleitung auf den Feed");
      }).catch(function(error) {
          console.error("Authentication failed:", error);
      })
    },
    facebook: function() {
      return auth.$authWithOAuthPopup("facebook")
      .then(function(authData) {
          $state.go('tab.feed.alle');
          console.log(authData);
      }).catch(function(error) {
          console.error("Authentication failed:", error);
      })
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
      auth.password = undefined;
      return userRef.child(userData.uid).set(auth);
    },
    get: function(id) {
      if (id === undefined) {
        id = Auth.getAuth().uid;
      }
      return $firebaseObject(userRef.child(id));
    },
    save: function(user) {
      return user.$save();
    }
  }
}])

.factory('Dog', ['$firebaseArray', '$firebaseObject', 'User', 'FBURL', 'Auth', function($firebaseArray, $firebaseObject, User, FBURL, Auth) {
  var ref = new Firebase(FBURL);
  var dogKeyRef = ref.child("users").child(Auth.getAuth().uid).child("dogs");
  var dogs = $firebaseArray(ref.child("dogs"));
  return {
    all: function() {
      var allDogs = [];
      var dogKeys = $firebaseObject(dogKeyRef);
      dogKeys.$loaded().then(function() {
        dogs.$loaded().then(function(){
          angular.forEach(dogKeys, function(value, key) {
            this.push(dogs.$getRecord(key));
          },allDogs)
        })
     })
      return allDogs;
    },
    add: function(dog) {
      return dogs.$add(dog).then(function(ref) {
         dogKeyRef.child(ref.key()).set(true);
      })
    },
    get: function(dogId) {
      return dogs.$getRecord(dogId);
    },
    save: function(dog) {
      return dogs.$save(dog);
    }

  }
}]);

