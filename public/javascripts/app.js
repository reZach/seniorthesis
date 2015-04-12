// Create the Angular app
var app = angular.module("myapp", ["googlechart", "ui.router"]);

/*************************************
/
/   CONFIG
/
/
*************************************/
app.config([
    "$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("index",
                {
                    url: "/index",
                    views: {
                        "hub": {
                            templateUrl: "/views/partials/main.html" ,
                            controller: "activityCtrl"
                        },
                        "accountHub": {
                            templateUrl: "/views/partials/userHub.html",
                            controller: "userCtrl"
                        }
                    }
                }
            )
            .state("options",
                {
                    url: "/options",
                    views: {
                        "hub": {
                            templateUrl: "/views/partials/options.html" ,
                            controller: "optionsCtrl"
                        },
                        "accountHub": {
                            templateUrl: "/views/partials/userHubOptions.html",
                            controller: "userCtrl"
                        }
                    }
                }
        );
        
            
        $urlRouterProvider.otherwise("index");
    }
]);

/*************************************
/
/   ON STARTUP
/
/
*************************************/
app.run(["$rootScope", function ($rootScope) {

    // Run any code on startup if we wanted to
    
    /*
    (function () {
       
    }())
    */

}]);


/*************************************
/
/   SERVICES
/
/
*************************************/
// Service that controls pie slice colors
app.factory("pieSliceColorService", function() {

    var obj = {
    
        // Holds all data
        data: {
            colors: [
                { color: "Blue", activity: "" },
                { color: "Red", activity: "" },
                { color: "Yellow", activity: "" },
                { color: "Gray", activity: "" },
                { color: "Pink", activity: "" },
                { color: "Maroon", activity: "" },
                { color: "MediumAquaMarine", activity: "" },
                { color: "MediumSeaGreen", activity: "" },
                { color: "MistyRose", activity: "" },
                { color: "Moccasin", activity: "" },
                { color: "Olive", activity: "" },
                { color: "Orange", activity: "" },
                { color: "PaleVioletRed", activity: "" },
                { color: "RebeccaPurple", activity: "" },
                { color: "RoyalBlue", activity: "" },
                { color: "SaddleBrown", activity: "" },
                { color: "Salmon", activity: "" },
                { color: "SeaShell", activity: "" },
                { color: "Black", activity: "" },
                { color: "SeaGreen", activity: "" },
                { color: "Silver", activity: "" },
                { color: "White", activity: "" },
                { color: "Tan", activity: "" },
                { color: "Tomato", activity: "" },
                { color: "Turquoise", activity: "" },
                { color: "Wheat", activity: "" },
                { color: "WhiteSmoke", activity: "" },
                { color: "DimGray", activity: "" },
                { color: "DeepPink", activity: "" },
                { color: "DarkKhaki", activity: "" },
                { color: "DarkGoldenRod", activity: "" },
                { color: "DarkCyan", activity: "" },
                { color: "Crimson", activity: "" },
                { color: "CornflowerBlue", activity: "" },
                { color: "Coral", activity: "" },
                { color: "Chocolate", activity: "" },
                { color: "Chartreuse", activity: "" },
                { color: "BurlyWood", activity: "" },
                { color: "BlanchedAlmond", activity: "" },
                { color: "Beige", activity: "" },
                { color: "Azure", activity: "" },
                { color: "AliceBlue", activity: "" },
                { color: "AntiqueWhite", activity: "" }
                /*{ slice: 43, color: "blue", activity: "" },
                { slice: 44, color: "blue", activity: "" },
                { slice: 45, color: "blue", activity: "" },
                { slice: 46, color: "blue", activity: "" },
                { slice: 47, color: "blue", activity: "" },
                { slice: 48, color: "blue", activity: "" },
                { slice: 49, color: "blue", activity: "" },
                { slice: 50, color: "blue", activity: "" },
                { slice: 51, color: "blue", activity: "" },
                { slice: 52, color: "blue", activity: "" },
                { slice: 53, color: "blue", activity: "" },
                { slice: 54, color: "blue", activity: "" },
                { slice: 55, color: "blue", activity: "" },
                { slice: 56, color: "blue", activity: "" },
                { slice: 57, color: "blue", activity: "" },
                { slice: 58, color: "blue", activity: "" },
                { slice: 59, color: "blue", activity: "" },
                { slice: 60, color: "blue", activity: "" },
                { slice: 61, color: "blue", activity: "" },
                { slice: 62, color: "blue", activity: "" },
                { slice: 63, color: "blue", activity: "" },
                { slice: 64, color: "blue", activity: "" },
                { slice: 65, color: "blue", activity: "" },
                { slice: 66, color: "blue", activity: "" },
                { slice: 67, color: "blue", activity: "" },
                { slice: 68, color: "blue", activity: "" },
                { slice: 69, color: "blue", activity: "" },
                { slice: 70, color: "blue", activity: "" },
                { slice: 71, color: "blue", activity: "" },
                { slice: 72, color: "blue", activity: "" },
                { slice: 73, color: "blue", activity: "" },
                { slice: 74, color: "blue", activity: "" },
                { slice: 75, color: "blue", activity: "" },
                { slice: 76, color: "blue", activity: "" },
                { slice: 77, color: "blue", activity: "" },
                { slice: 78, color: "blue", activity: "" },
                { slice: 79, color: "blue", activity: "" },
                { slice: 80, color: "blue", activity: "" },
                { slice: 81, color: "blue", activity: "" },
                { slice: 82, color: "blue", activity: "" },
                { slice: 83, color: "blue", activity: "" },
                { slice: 84, color: "blue", activity: "" },
                { slice: 85, color: "blue", activity: "" },
                { slice: 86, color: "blue", activity: "" },
                { slice: 87, color: "blue", activity: "" },
                { slice: 88, color: "blue", activity: "" },
                { slice: 89, color: "blue", activity: "" },
                { slice: 90, color: "blue", activity: "" },
                { slice: 91, color: "blue", activity: "" },
                { slice: 92, color: "blue", activity: "" },
                { slice: 93, color: "blue", activity: "" },
                { slice: 94, color: "blue", activity: "" },
                { slice: 95, color: "blue", activity: "" },
                { slice: 96, color: "blue", activity: "" },
                { slice: 97, color: "blue", activity: "" },
                { slice: 98, color: "blue", activity: "" },
                { slice: 99, color: "blue", activity: "" },
                { slice: 100, color: "blue", activity: "" },*/
            ]
        },

        // Inits colors
        init: function(){
        
            var cookieColors = obj.getColors();
            
            // If we don't have any activities
            if (cookieColors.length == 0){
            
                var colors = obj.data.colors;
             
                // Assign the cookie
                obj.setColorsCookie(colors);
            } else {
            
                angular.copy(cookieColors, obj.data.colors);
            }
        },
        
        // Sets cookie
        setColorsCookie: function(colors){
            docCookies.setItem("activityColors", JSON.stringify(colors), Infinity);
        },
        
        // Sorts colors and removes empty colors
        sortColorsRemoveEmpty: function(colors){
        
            for (var i = 0; i < colors.length; i++){
            
                if (colors[i].activity === ""){
                
                    colors.splice(i,1);
                    i = i - 1;
                }
            }
            
            // Sort alphabetically by activity name
            colors.sort(
                function (a, b) {
                    if (a.activity > b.activity) { return 1; }
                    if (b.activity < a.activity) { return -1; }
                    return 0;
                });
                
            return colors;
        },        
        
        // Gets colors
        getColors: function(){
        
            if (docCookies.hasItem("activityColors")) {

                var colors = JSON.parse(docCookies.getItem("activityColors"));

                // Cast into an array if not already an array
                if (colors.constructor != Array) {

                    colors = [colors];
                }                

                return colors;
            }

            return [];
        },
        
        // Assigns color to an activity
        assignColor: function(activityName){
        
            var pieSliceIndex = -1;
            var found = false;
            var colors = obj.getColors();
            
            // Search for open colors for the activity
            for (var i = 0; i < colors.length; i++){
            
                // If this color is unassigned
                if (colors[i].activity === "" && pieSliceIndex == -1) {
                    pieSliceIndex = i;
                } else if (colors[i].activity === activityName) {
                    found = true;
                }
            }
            
            // Throw errors
            if (pieSliceIndex == -1){
                throw "Cannot find an unused color for the activity";
            }                       
            
            
            if (pieSliceIndex != -1 && !found) {
            
                colors[pieSliceIndex].activity = activityName;
            }
            
            // Re-assign objects
            obj.setColorsCookie(colors);
            angular.copy(colors, obj.data.colors);
        },
        
        // Dissociates color and activity
        dissociate: function(activityName){
        
            var colors = obj.getColors();
            
            for (var i = 0; i < colors.length; i++){
            
                if (colors[i].activity === activityName){
                    colors[i].activity = "";
                    break;
                }
            }
            
            // Re-assign objects
            obj.setColorsCookie(colors);
            angular.copy(colors, obj.data.colors);
        }
    };
    
    return obj;
});


// Service that handles activities
app.factory("activityService", ["pieSliceColorService", function(pieSliceColorService) {
    
    var obj = {
        
        // Holds all data
        data: {
            activities: [],
            activeActivity: {
                val: ""
            },
            idleActivity: {
                val: "Idle"
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

// Service that handles graph logic
app.factory("graphService", ["activityService", "pieSliceColorService", function(activityService, pieSliceColorService){

    var obj = {
        
        // Holds all data
        data: {
            chart: {},
            details: []
        },

        // Creates string representation of an activities' time
        createTimeRepresentation: function(time){
        
            // Calculate each time
            var years = time / 1000 / 60 / 60 / 24 / 7 / 52;
            var weeks = years % 1 * 52;
            var days = weeks % 1 * 7;
            var hours = days % 1 * 24;
            var minutes = hours % 1 * 60;
            var seconds = minutes % 1 * 60;

            // Get rid of all decimals
            years = Math.floor(years);
            weeks = Math.floor(weeks);
            days = Math.floor(days);
            hours = Math.floor(hours);
            minutes = Math.floor(minutes);
            seconds = Math.floor(seconds);

            /* Build string representation of time */
            var strTime = "";

            if (years != 0) { strTime += years + "y - "; }
            if (weeks != 0) { strTime += weeks + "w - "; }
            if (days != 0) { strTime += days + "d - "; }
            if (hours != 0) { strTime += hours + "h - "; }
            if (minutes != 0) { strTime += minutes + "m - "; }
            if (seconds != 0) { strTime += seconds + "s - "; }

            if (strTime.length >= 3) {

                strTime = strTime.substring(0, strTime.length - 3);
            }
            
            return strTime;
        },
        
        // Initialize constants for google-chart
        initChart: function(day){
        
            var chart = {};
            var graphTitle;
            var currentDay = new Date().setHours(0, 0, 0, 0);
                        
            // Fix up representation of day with the graph
            currentDay = currentDay - ((day * -1) * 86400000);
            
            if (day == 0) {
                graphTitle = "Today";
            }
            else if (day == -1){
                graphTitle = "Yesterday";
            } else if (day < -1) {
                graphTitle = (day * -1) + " days ago";     
            }
            
            currentDay = new Date(currentDay);
            graphTitle += " (" + (currentDay.getMonth() + 1) + "/" + currentDay.getDate() + "/" + (currentDay.getFullYear() % 100) + ")";
            
            // Initialize all data for our chart
            // that we can ( minus activity data )            
            chart.data = {
                cols: [{
                    id: "A",
                    label: "Activity",
                    type: "string"
                },
                {
                    id: "B",
                    label: "Time",
                    type: "string"
                }],
                rows: []
            }
            
            chart.type = "PieChart";
            chart.options = {            
                height: 360,
                width: 360,
                backgroundColor: "#C1DBF5",
                title: graphTitle,
                legend: {
                    position: "none"
                },
                pieSliceTextStyle: {
                    color: "black", 
                    fontName: "Ubuntu, sans-serif", 
                    fontSize: 12
                },
                titleTextStyle: {
                    color: "black", 
                    fontName: "Ubuntu, sans-serif", 
                    fontSize: 12
                },
                tooltip: {
                    textStyle: {
                        color: "black", 
                        fontName: "Ubuntu, sans-serif", 
                        fontSize: 12
                    }                                    
                }                    
            };
            
            return chart;
        },
        
        // Create the chart
        createChart: function(day){
        
            /*
                Note: 'day' will represent the day
                in string format of the day we want to 
                generate a graph for
                
                '0'                 = today
                '-1'                = yesterday
                '-2'                = 2 days ago
                '-3'                = 3 days ago
            */
            
            activityService.recalculateActivityTimes();
            
            
            var graph = obj.initChart(day);
            var data = activityService.getActivities();
            var tempDate = new Date(); tempDate = tempDate.setHours(0, 0, 0, 0);
            var dayInMilliseconds = 1000 * 3600 * 24;
            var currentDate = new Date(Date.now()).setHours(0, 0, 0, 0);
            var dataBlockDate;
            
            var totalActivityTime = 0;
            var individualActivityTime = 0;
            
            // Loop through every activity
            for (var i = 0; i < data.length; i++){
            
                // Loop through each data block
                for (var j = 0; j < data[i].data.length; j++){
                
                    dataBlockDate = new Date(data[i].data[j].date).setHours(0, 0, 0, 0);
                    
                    // dayOfDataBlock will equal the string representation
                    // of the proper day
                    var dayOfDataBlock = ((tempDate - dataBlockDate) / dayInMilliseconds) * -1;

                    if (dayOfDataBlock == day){
                        
                        // Calculate time
                        totalActivityTime += data[i].data[j].time;
                        individualActivityTime += data[i].data[j].time;
                    }
                }
                
                // Add activity data to graph
                graph.data.rows.push({
                    c: [
                        { v: data[i].name }, // name of activity
                        {
                            v: individualActivityTime, // STILL NEEDS TO BE FACTORED WITH TOTAL TIME (* this is done later)
                            f: obj.createTimeRepresentation(individualActivityTime) // string representation of time
                        }
                    ]
                });
                
                // Reset individual time
                individualActivityTime = 0;
            }
            
            // Don't calculate total time if we have no activities
            // Calculate percentage times (using total time)
            if (data.length != 0) {
                for (var i = 0; i < graph.data.rows.length; i++){
                    
                    graph.data.rows[i].c[1].v = Math.floor(graph.data.rows[i].c[1].v / totalActivityTime * 100);
                }
            }
            
            // Pie slice colors
            graph.options.slices = obj.buildSliceColors();
            
            // Set chart details
            obj.setChartDetails(graph);
            
            // Needed to update controllers properly
            angular.copy(graph, obj.data.chart);
        },
        
        // Sets details of the chart for other display
        setChartDetails: function(graph){
        
            /*
                Note: 'day' will represent the day
                in string format of the day we want to 
                generate a graph for
                
                '0'                 = today
                '-1'                = yesterday
                '-2'                = 2 days ago
                '-3'                = 3 days ago
            */
            
            // Get chart details
            var details = [], item;
            
            for (var i = 0; i < graph.data.rows.length; i++){
            
                item = graph.data.rows[i].c;
                
                details.push({
                    value: item[1].v,
                    name: item[0].v,
                    str: item[1].f
                });
            }
            
            // Sort details
            details.sort(
                function (a, b) {
                    if (a.value > b.value) { return 1; }
                    if (b.value < a.value) { return -1; }
                    return 0;
                });
                
            // Assign details
            angular.copy(details, obj.data.details);
        },
        
        // Build pie slice colors
        buildSliceColors: function(){
        
            var colors = pieSliceColorService.getColors();
            colors = pieSliceColorService.sortColorsRemoveEmpty(colors);
        
            var slices = {};
            
            // Create slices
            for (var i = 0; i < colors.length; i++){
            
                slices[i] = {
                    color: colors[i].color
                };
            }
            
            return slices;
        }
    };
    
    return obj;
}]);

// User service that handles login / database logic
app.factory("user", ["$http", "activityService", function($http, activityService){
    
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
        update: function() {
        
            var obj = activityService.getActivities();            
                
            var promise = $http.post('/update', obj);
            
            return promise;
        }
    
    };    
    
    return o;
}]);


/*************************************
/
/   CONTROLLERS
/
/
*************************************/
app.controller("userCtrl", ["$scope", "user", function ($scope, user) {

    $scope.user = user.user;
    
    user.getMe().success(function(a){
        // to-do?
    }).error(function(b){
        // to-do?
    });
     
    //user.update();
 }]);

app.controller("activityCtrl", ["$scope", "$interval", "activityService", "graphService", "pieSliceColorService", function ($scope, $interval, activityService, graphService, pieSliceColorService) {

    $scope.activities = activityService.data.activities;
    activityService.initActivities();
    pieSliceColorService.init();
    
    $scope.googlechart = graphService.data.chart;
    $scope.googlechartdetails = graphService.data.details;
    $scope.activeActivity = activityService.data.activeActivity;
    $scope.idleActivity = activityService.data.idleActivity;
    $scope.graphDay = "0";
    
    graphService.createChart($scope.graphDay);
    
    // Creates a new activity
    $scope.newActivity = function(activityName){
    
        try
        {
            activityService.addActivity(activityName);            
        } catch (e) {
            alert(e);
        }
    };
    
    // Selects an activity
    $scope.selectActivity = function(activityName){
    
        try
        {
            activityService.selectActivity(activityName);
        } catch (e) {
            alert(e);
        }
    };
    
    // Starts the selected activity
    $scope.startSelectedActivity = function(){
    
        try
        {
            activityService.startSelectedActivity();
        } catch (e) {
            alert(e);
        }
    };
    
    // Deletes an activity
    $scope.deleteActivity = function(activityName){
    
        try
        {
            activityService.deleteActivity(activityName);
        } catch (e) {
            alert(e);
        }
    };
    
    // Goes to the previous day
    $scope.previousDay = function(){
    
        $scope.graphDay = $scope.graphDay - 1;
        
        $scope.generateChart();
    };
    
    // Goes forward a day
    $scope.nextDay = function(){
        
        if ($scope.graphDay < 0){
            $scope.graphDay = $scope.graphDay + 1;
        }
        
        $scope.generateChart();
    };
    
    // Generates the chart
    $scope.generateChart = function(){
        
        try
        {
            graphService.createChart($scope.graphDay);
        } catch (e) {
            alert(e);
        }
    };
    
    // Autogenerate the chart
    $scope.autogenerateChart = function(){
    
        $(".js-autogenerate-chart").addClass("fa-pulse active");
        $(".js-autogenerate-chart").parent().attr("disabled", true);
        
        try
        {
            graphService.createChart($scope.graphDay);
            
            $interval(function(){

                graphService.createChart($scope.graphDay);
            }, 5000);
        } catch (e) {
            $(".js-autogenerate-chart").removeClass("fa-pulse active");
            $(".js-autogenerate-chart").parent().attr("disabled", false);
        
            alert(e);
        }
    };
    
    // Swaps to idle
    $scope.idleSwap = function(){
    
        try
        {
            activityService.idleSwap();
        } catch (e) {
            alert(e);
        }
    };
    
    // Reset
    $scope.reset = function(){
    
        try
        {
            activityService.reset();
        } catch (e) {
            alert(e);
        }
    };
    
    // Stop activity
    $scope.stop = function(){
    
        try
        {
            activityService.stop();
        } catch (e) {
            alert(e);
        }
    };
    
}]);

app.controller("optionsCtrl", ["$scope", function($scope) {


}]);