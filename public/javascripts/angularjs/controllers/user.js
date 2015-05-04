
app.controller("userCtrl", ["$scope", "userService", function ($scope, userService) {

    $scope.user = userService.user;
    
    // Downloads latest data from the database
    $scope.cloudDownload = function(){
    
        try
        {
            userService.download();
        } catch (e) {
            alert(e);
        }        
    };
    
    // Uploads latest dat to the database
    $scope.cloudUpload = function(){
    
        try
        {
            userService.upload();
        } catch (e) {
            alert(e);
        }
    };
    
    userService.getMe().success(function(a){
        // will load user options
    }).error(function(b){
        // will not load user options
    });

 }]);