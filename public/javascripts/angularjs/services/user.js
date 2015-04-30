
// User service that handles login / database logic
angular.module("myapp").factory("userService", ["$http", "activityService", function($http, activityService){
    
    var o = {
        
        user: {},
        getMe: function() {
            var promise = $http.get('/getme');
            
            // Call on success of api call
            promise.success(function(obj){
                angular.copy(obj, o.user);
            });
            
            return promise;
        },
        upload: function() {
                     
            var promise = $http.post('/update');
            
            return promise;
        },
        download: function() {
        
            var promise = $http.get("/activitydata");
            
            promise.success(function(obj){
                alert(JSON.parse(obj));
            });
            
            return promise;
        }
    
    };    
    
    return o;
}]);