angular.module('starter.services', [])

.factory('Members', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var members = [{
    id: 0,
    name: 'Hannes Flaig',
    distance: '1 km',
    face: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/c122.2.716.716/s320x320/1385347_637449916305701_79059897_n.jpg?oh=90bd788e2b2dfd9b11bb7c90d26e3603&oe=55C9441E&__gda__=1440372877_079b747f8e88781474e8529291d4b07b'
  }, {
    id: 1,
    name: 'Raphael Leuthner',
    distance: '2 km',
    face: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/v/t1.0-1/c0.35.320.320/p320x320/10155233_10202306793937959_7746588956254689173_n.jpg?oh=2d1e3522b98ae0e5ee5173952a46855b&oe=55D32C99&__gda__=1439349640_89d8470f8b8b25f48b0afffae455bf1b'
  },{
    id: 2,
    name: 'Henrik Müller',
    distance: '3 km',
    face: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p320x320/10922698_929787937051670_2499390580754583765_n.jpg?oh=3c05e56fe463b8522fe91182be25ac28&oe=55BFFD95&__gda__=1439186576_0459a0dc891238eae806d9a6b248bca4'
  }, {
    id: 3,
    name: 'Rebecca Konrad',
    distance: '4 km',
    face: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpt1/v/t1.0-1/c59.154.512.512/s320x320/11062038_807517302676404_2175381001689592578_n.jpg?oh=1d489b23df96f2c5b6adba411bfdd9aa&oe=55C17C6C&__gda__=1443700014_12caa6fc50f672891d8ae55d4691b261'
  }, {
    id: 4,
    name: 'Tobias Kirchner',
    distance: '5 km',
    face: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/v/t1.0-1/c1.63.787.787/s320x320/10599149_750965168282660_7017218834142046411_n.jpg?oh=6b37d8ea5c15b9ca8221dde79bdfe6b0&oe=55C8C554&__gda__=1439841744_773d0b7c32083616e34f7f9bcf3471fc'
  }];

  return {
    all: function() {
      return members;
    }
  };
});
