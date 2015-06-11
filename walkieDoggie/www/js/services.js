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
  var dogList = $firebaseArray(ref.child("dogs"));
  return {
    all: function() {
      var allDogs = [];
      var dogKeys = $firebaseObject(dogKeyRef);
      dogKeys.$loaded().then(function() {
        dogList.$loaded().then(function(){
          angular.forEach(dogKeys, function(value, key) {
            this.push(dogList.$getRecord(key));
          },allDogs)
        })
     })
      return allDogs;
    },
    add: function(dog) {
      return dogList.$add(dog).then(function(ref) {
         dogKeyRef.child(ref.key()).set(true);
      })
    },
    get: function(dogId) {
      return dogList.$getRecord(dogId);
    },
    save: function(dog) {
      return dogList.$save(dog);
    },
    remove: function(dog) {
      return dogList.$remove(dog).then(function(ref){
        dogKeyRef.child(ref.key()).remove();
      })
    }
  }
}])

.factory('Location', ['$firebaseArray', '$firebaseObject', 'FBURL', 'Auth', function($firebaseArray, $firebaseObject, FBURL, Auth){
    var ref = new Firebase(FBURL);
    var locationRef = ref.child("locations");
    
    return{
        all: function(){
            return $firebaseArray(locationRef);
        },
        create: function(location){
            console.log('.factory create --> location: ' + location);
            console.log('.factory locationRef.push().set(location) ' + locationRef.push().set(location));
            return locationRef.push().set(location);
        },
        get: function(id){
            if( id != undefined){
                return locationRef.$getRecord(id);
            }
        },
        save: function(location) {
            return locationRef.$save(location);
        }
    }
}]);
