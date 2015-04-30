
angular.module("myapp").controller("optionsCtrl", ["$scope", function($scope) {

    // Deletes all cookie data
    $scope.deleteAllData = function(){
    
        docCookies.removeItem("activities", "", "127.0.0.1");
        docCookies.removeItem("activityColors", "", "127.0.0.1");
        
        alert("All data was deleted\n\n\n*Please hard-refresh the page for changes to take effect!\n(ctrl + F5)");
    };

}]);