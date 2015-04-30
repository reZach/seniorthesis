
// Service that handles activities
angular.module("myapp").factory("activityService", ["pieSliceColorService", function(pieSliceColorService) {
    
    var obj = {
        
        // Holds all data
        data: {
            activities: [],
            activeActivity: {
                val: ""
            },
            idleActivity: {
                val: "Idle"
            },
            selectedActivity: {
                val: ""
            }
        },
        
        // Sets cookie
        setActivitiesCookie: function(activities){
            docCookies.setItem("activities", JSON.stringify(activities), Infinity);
        },
        
        // Initializes activities on page-load for the controller
        initActivities: function() {
        
            var activities = obj.getActivities();
            
            // Set active activity
            for (var i = 0; i < activities.length; i++){
      
                // On the 2+ pass of the foor loop,
                // we need to update the "activities" variable
                if (i != 0){
                    activities = obj.getActivities();
                }
                                
                // Start the selected activity
                if (activities[i].active){
                    obj.selectActivity(activities[i].name);
                    activities = obj.getActivities();                    
                    
                    obj.startSelectedActivity(activities[i].name);
                    activities = obj.getActivities();
                }
                
                if (activities[i].selected){
                    angular.copy({val: activities[i].name}, obj.data.selectedActivity);
                }
                
                // No activity is idle on page load
                activities[i].idle = false;
                
                // Update variables
                obj.setActivitiesCookie(activities);
                angular.copy(activities, obj.data.activities);
            }
            
            angular.copy(activities, obj.data.activities);
        },
        
        // Returns array of activities
        getActivities: function() {
        
            if (docCookies.hasItem("activities")) {

                var activities = JSON.parse(docCookies.getItem("activities"));

                // Cast into an array if not already an array
                if (activities.constructor != Array) {

                    activities = [activities];
                }

                // Sort alphabetically by name
                activities.sort(
                    function (a, b) {
                        if (a.name > b.name) { return 1; }
                        if (b.name < a.name) { return -1; }
                        return 0;
                    });

                return activities;
            }

            return [];
        },
        
        // Adds new activity
        addActivity: function(activityName){
        
            if (activityName === "undefined" || !activityName) {
                throw "Cannot add activity with no name";
            }
            
            if (activityName === "Idle") {
                throw "Cannot add activity of 'Idle'";
            }
            
            if (activityName === "") {
                throw "Activity cannot be empty";
            }
            
            var activities;
            
            // If our cookie doesn't exist
            if (!docCookies.hasItem("activities")) {

                docCookies.setItem("activities", 
                    [JSON.stringify({ 
                        name: activityName, 
                        active: false,
                        selected: false,
                        idle: false,
                        data: []
                    })], 
                    Infinity);
                    
                pieSliceColorService.assignColor(activityName);
                    
                activities = obj.getActivities();               
            } else {

                activities = obj.getActivities();

                for (var i = 0; i < activities.length; i++) {
                    
                    // Don't add activity if it already exists
                    if (activities[i].name == activityName) {
                        throw "Activity already exists";
                    }
                }

                activities.push({ 
                    name: activityName, 
                    active: false,
                    selected: false,
                    idle: false,
                    data: []
                });
                
                pieSliceColorService.assignColor(activityName);
                
                obj.setActivitiesCookie(activities);                       
            }
            
            // Needed to update controllers properly
            angular.copy(activities, obj.data.activities);
        },
        
        // Selects an activity
        selectActivity: function(activityName){
        
            if (activityName === "undefined" || !activityName) {
                throw "Unknown error";
            }
            
            var activities = obj.getActivities();
            
            // Select the activity, the rest of the
            // activities we de-select
            for (var i = 0; i < activities.length; i++){
            
                if (activities[i].name == activityName){                
                    activities[i].selected = true;
                } else {
                    activities[i].selected = false;
                }
            }
            
            obj.setActivitiesCookie(activities);
            
            // Needed to update controllers properly
            angular.copy(activities, obj.data.activities);
            angular.copy({val: activityName}, obj.data.selectedActivity);
        },
        
        // Starts the currently selected activity
        startSelectedActivity: function(){
        
            var selectedActivity;
            var activities = obj.getActivities();
            
            for (var i = 0; i < activities.length; i++){
            
                // Find selected activity
                if (activities[i].selected){
                    
                    selectedActivity = activities[i];
                    activities[i].active = true;
                } else {
                
                    // Every other activity is now not active
                    activities[i].active = false;
                }
            }
            
            // If we could not find the selected activity for some reason (bug catching)
            if (selectedActivity === "undefined" || !selectedActivity){
                throw "Could not find selected activity";
            }
        
            /*
                Once we find the activity we want to start,
                we calculate any time that activity has accumulated.

                Or if this is the first time the activity has started,
                we will not calculate any time the activity has accumulated
            */
            
            /* Calculation logic */
            
            var dataBlock; // Holds reference to data block we will be modifying
            var currentTime = Date.now();
            var currentDate = new Date().setHours(0, 0, 0, 0);            
            
            if (selectedActivity.data.length == 0){ // This activity hasn't been started before
            
                // Add first record to this activity
                selectedActivity.data.push({
                    time: 0,
                    date: currentDate,
                    timestamp: currentTime
                });
                
            } else {
            
                // We may need to add a new data block
                // if the most recent data block doesn't
                // belong to the current day                
                
                var activityDataDate;
                currentDate = new Date(currentTime).setHours(0, 0, 0, 0);
                
                // Look at the most recent data block                                
                dataBlock = selectedActivity.data[selectedActivity.data.length - 1];                    
                activityDataDate = new Date(dataBlock.date).setHours(0, 0, 0, 0);
                
                // If the current date is greater than the
                // date of the data block, we need to create
                // a new data block for this activity
                if (currentDate > activityDataDate){
                
                    // Create new data block
                    selectedActivity.data.push({
                        time: 0,
                        date: currentDate,
                        timestamp: currentTime
                    });
                } 

                // If date of the data block is today
                else if (currentDate == activityDataDate){
                    
                    // Update the latest data block
                    if (selectedActivity.data[selectedActivity.data.length - 1].timestamp != 0){
                    
                        selectedActivity.data[selectedActivity.data.length - 1].time += (currentTime - selectedActivity.data[selectedActivity.data.length - 1].timestamp);
                    }
                    
                    selectedActivity.data[selectedActivity.data.length - 1].timestamp = currentTime;
                }
            }
            
            obj.setActivitiesCookie(activities);
            
            // Needed to update controllers properly
            angular.copy(activities, obj.data.activities);
            angular.copy({val: selectedActivity.name}, obj.data.activeActivity);
            angular.copy({val: "Idle"}, obj.data.idleActivity);
        }, 
        
        // Updates time on all activities
        recalculateActivityTimes: function(){
        
            var activities = obj.getActivities();
            var currentTime = Date.now();
            var currentDate = new Date(currentTime).setHours(0, 0, 0, 0);
            var activityDataDate;
            
            // Loop through all activities
            for (var i = 0; i < activities.length; i++){
            
                for (var j = 0; j < activities[i].data.length; j++){
                
                    // Get date of the data block of the activity
                    activityDataDate = new Date(activities[i].data[j].date).setHours(0, 0, 0, 0);
                    
                    // If the date of the data block and the current day are the same,
                    // we don't have to make a new data block
                    if (currentDate == activityDataDate){
                    
                        // Don't calculate anything if there is no need to
                        if (activities[i].data[j].timestamp != 0){
                        
                            activities[i].data[j].time += (currentTime - activities[i].data[j].timestamp);
                        }
                        
                        // Our timestamp is re-assigned to the current time
                        // if the activity is active, otherwise it is set to zero
                        activities[i].data[j].timestamp = (activities[i].active ? currentTime : 0);
                        
                    } else if (currentDate > activityDataDate && activities[i].data.length - 1 == j){
                 
                        // 86400000 milliseconds in a day                                        

                        var numberOfDays = Math.floor((currentDate - activityDataDate) / 86400000);
                 
                        // If our activity has been active for over a day
                        // Increment time of activity for given number of days
                        if (numberOfDays > 1){
                            for (var k = 0; k < numberOfDays; k++){
                            
                                activities[i].data.push({
                                    date: activityDataDate + ((k + 1)*86400000), // Gets proper milliseconds for the day to represent the date
                                    time: (activities[i].active ? 86400000 : 0), // If activity was active, set to max time. Otherwise set to 0
                                    timestamp: 0 
                                });
                            }
                        } else if (numberOfDays == 1){
                        
                            // Calculate time (less than a day's worth)
                            if (activities[i].data[j].timestamp != 0){
                            
                                // Get time of the end of the last day
                                var date = new Date(activities[i].data[j].timestamp).setHours(23, 59, 59, 999);
                                
                                // Calculate the time
                                activities[i].data[j].time += date - activities[i].data[j].timestamp;
                                activities[i].data[j].timestamp = 0;
                            }                            
                        }
                 
                        if (activities[i].active){

                            activities[i].data.push({
                                date: currentDate,
                                time: currentDate - new Date(currentDate).setHours(0, 0, 0, 0),
                                timestamp: currentTime
                            });
                        } else {
                        
                            activities[i].data.push({
                                date: currentDate,
                                time: 0,
                                timestamp: 0
                            });
                        }
                    }
                }
            }
            
            obj.setActivitiesCookie(activities);
            
            // Needed to update controllers properly
            angular.copy(activities, obj.data.activities);
        },
        
        // Deletes an activity
        deleteActivity: function(activityName){
        
            if (activityName === "undefined" || !activityName){
                throw "Unknown error";
            }
            
            var activities = obj.getActivities();
            
            for (var i = 0; i < activities.length; i++){
            
                if (activities[i].name == activityName){
                            
                    // These checks will properly dispose
                    // of special-case activities (activities in an idle or swapped state)
                    if (activities[i].idle){
                        obj.reset();
                    } else if (activities[i].active){
                        obj.stop();                    
                    }
                    
                    // Remove activity
                    activities.splice(i, 1);
                    pieSliceColorService.dissociate(activityName);
                    
                    break;
                }
            }
            
            obj.setActivitiesCookie(activities);
            
            // Needed to update controllers properly
            angular.copy(activities, obj.data.activities);
        },
        
        // Swaps to idle
        idleSwap: function(){
        
            /*
                KEY
                
                AA - ActiveActivity
                IA - IdleActivty
            */
            var activities = obj.getActivities();
            
            var currentActiveActivity = obj.data.activeActivity.val;
            var currentIdleActivity = obj.data.idleActivity.val;
            
            if (currentActiveActivity == "" && currentIdleActivity == "Idle"){
            
                /*
                    State changes -
                    
                    AA:
                        from "" to "Idle"
                        from "Idle" to "Idle"
                    IA:
                        from "Idle" to "Idle"                
                */
                
                angular.copy({val: "Idle"}, obj.data.idleActivity);
                angular.copy({val: "Idle"}, obj.data.activeActivity);
            } else if (currentActiveActivity != "" && currentActiveActivity != "Idle" && currentIdleActivity == "Idle"){
            
                /*
                    State changes -
                
                    AA:
                        from [activity] to "Idle"
                    IA:
                        from "Idle" to [activity]
                */
                
                for (var i = 0; i < activities.length; i++){
                
                    if (activities[i].active){
                        
                        activities[i].active = false;
                        activities[i].selected = false;
                        activities[i].idle = true;
                        
                        // Update last timestamp
                        activities = obj.updateLastDataBlock(activities, i, false);
                        
                        angular.copy({val: activities[i].name}, obj.data.idleActivity);
                        angular.copy({val: "Idle"}, obj.data.activeActivity);
                        angular.copy({val: ""}, obj.data.selectedActivity);
                        break;
                    }
                }
            } else if (currentIdleActivity != "" && currentIdleActivity != "Idle" && currentActiveActivity == "Idle"){
            
                /*
                    State changes -
                    
                    AA:
                        from "Idle" to [activity]
                    IA:                    
                        from [activity] to "Idle"
                */
                
                for (var i = 0; i < activities.length; i++){
                
                    if (activities[i].idle){                                           
                        
                        // Need to update reference to array
                        // so that array is updated properly at the end
                        obj.selectActivity(activities[i].name);
                        activities = obj.getActivities();
                        
                        obj.startSelectedActivity(activities[i].name);
                        activities = obj.getActivities();
                        
                        activities[i].idle = false;
                        
                        angular.copy({val: "Idle"}, obj.data.idleActivity);
                        angular.copy({val: activities[i].name}, obj.data.activeActivity);
                        break;
                    }
                }
            }
            
            
            obj.setActivitiesCookie(activities);
            
            // Needed to update controllers properly
            angular.copy(activities, obj.data.activities);
        },
        
        // Resets activities (and "Idle" button status)
        reset: function(){
        
            var activities = obj.getActivities();
        
            for (var i = 0; i < activities.length; i++){
            
                if (activities[i].idle) {
                
                    activities[i].idle = false;
                    break;
                }
            }
            
            obj.setActivitiesCookie(activities);
            
            // Needed to update controllers properly
            angular.copy(activities, obj.data.activities);
            angular.copy({val: "Idle"}, obj.data.idleActivity);
            angular.copy({val: ""}, obj.data.activeActivity);
            angular.copy({val: ""}, obj.data.selectedActivity);
        },
        
        // Stops activity (goes back to fresh load state)
        stop: function(){
        
            var activities = obj.getActivities();
            
            for (var i = 0; i < activities.length; i++){
            
                if (activities[i].active) {
                
                    activities[i].active = false;
                    
                    // Update last timestamp
                    activities = obj.updateLastDataBlock(activities, i, false);
                    
                    break;
                }
            }
            
            obj.setActivitiesCookie(activities);
            
            // Needed to update controllers properly
            angular.copy(activities, obj.data.activities);
            angular.copy({val: "Idle"}, obj.data.idleActivity);
            angular.copy({val: ""}, obj.data.activeActivity);
        },
        
        // Updates last data block for an activity
        updateLastDataBlock: function(activities, index, newTimestamp){
                    
            // Recalculates time and sets the timestamp
            var lastDataBlock = activities[index].data.length - 1;
            var currentTime = Date.now();
             
            // math
            activities[index].data[lastDataBlock].time += (currentTime - activities[index].data[lastDataBlock].timestamp);                            
            activities[index].data[lastDataBlock].timestamp = (newTimestamp ? currentTime : 0);
            
            return activities;
        }
    };
    
    return obj;
}]);