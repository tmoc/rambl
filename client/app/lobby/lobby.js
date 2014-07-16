angular.module('handleApp.lobby', [])

.controller('lobbyController', function ($scope, $location, EasyRTC, $interval) {
  $scope.data = {}
 	$scope.lobbyDisconnect = function () {
    EasyRTC.lobbyDisconnect(); 
    $interval.cancel(getRoomsRepeatedly);
 	};
  // sets currentRoom then navigates to the room route
  $scope.setCurrentRoomAndNavigate = function (roomName, path) {
    $interval.cancel(getRoomsRepeatedly);
    EasyRTC.setCurrentRoom(roomName); 
    $location.path(path); 
  };
  
  // connect to server then get rooms with asynchronous callback and apply them to scope
  EasyRTC.connect(function () {
	  EasyRTC.getRooms(function (rooms) {
	  	$scope.$apply(function () {
  	    $scope.data.rooms = rooms;
	  	});
	  });
  });
  
  // this is so that rooms are displayed instantly when going from room to lobby 
  EasyRTC.getRooms(function (rooms) {
	  	$scope.$apply(function () {
		    $scope.data.rooms = rooms;
	  	});
	});

  // update room list every 2 seconds 
  var getRoomsRepeatedly = $interval(function () {
		EasyRTC.getRooms(function (rooms) {
	  	$scope.$apply(function () {
		    $scope.data.rooms = rooms;
	  	});
	  });
  }, 2000);

});
