
angular.module("myapp").controller("optionsCtrl", ["$scope", function($scope) {

    // Deletes all cookie data
    $scope.deleteAllData = function(){
    
        docCookies.removeItem("activities", "", "127.0.0.1");
        docCookies.removeItem("activityColors", "", "127.0.0.1");

        // Reloads data from the server
        location.reload(false);
    };

}]);