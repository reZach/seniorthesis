
app.controller("userCtrl", ["$scope", "userService", function ($scope, userService) {

    $scope.user = userService.user;
    
    $scope.cloudDownload = function(){
    
        try
        {
            userService.download();
        } catch (e) {
            alert(e);
        }        
    };
    
    $scope.cloudUpload = function(){
    
        try
        {
            userService.upload();
        } catch (e) {
            alert(e);
        }
    };

 }]);