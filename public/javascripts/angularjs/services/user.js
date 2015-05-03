
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
                
                // Remove properties so we can straight copy the obj
                delete obj["__v"];
                delete obj["_id"];
                delete obj.activities["__v"];
                delete obj.activities["_id"];                
                
                for (var i = 0; i < obj.activities.length; i++){
                    
                    delete obj.activities[i]["__v"];
                    delete obj.activities[i]["_id"];
                    
                    for (var j = 0; j < obj.activities[i].time.length; j++){
                    
                        delete obj.activities[i].time[j]["__v"];
                        delete obj.activities[i].time[j]["_id"];
                    }
                }
                
                // obj.colors may not exist if user has not pushed
                // data to the database yet
                if (obj.colors){
                
                    delete obj.colors["__v"];
                    delete obj.colors["_id"];
                    
                    for (var i = 0; i < obj.colors.colors.length; i++){
                    
                        delete obj.colors.colors[i]["__v"];
                        delete obj.colors.colors[i]["_id"];
                    }
                    
                    docCookies.setItem("activityColors", JSON.stringify(obj.colors.colors), Infinity);
                }                
                
                docCookies.setItem("activities", JSON.stringify(obj.activities), Infinity);
                
                // reload from the server (true would load from the cache)
                location.reload(false);
            });
            
            return promise;
        }
    
    };    
    
    return o;
}]);