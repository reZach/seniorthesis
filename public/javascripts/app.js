
var app = angular.module("myapp", ["googlechart", "ui.router"]);

app.config([
    "$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $stateProvider.state("index",
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
            });
            
        //$stateProvider.state("
            
        $urlRouterProvider.otherwise("index");
    }
]);

app.run(["$rootScope", function ($rootScope) {

    // Run any code on startup if we wanted to
    
    /*
    (function () {
       
    }())
    */

}]);

// dataServiceFactory
app.factory("activityService", function() {
    
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
        
            debugger;
            var activities = obj.getActivities();
            
            // Set active activity
            for (var i = 0; i < activities.length; i++){
            
                if (i != 0){
                    activities = obj.getActivities();
                }
                
                if (activities[i].active){                    
                    angular.copy({val: activities[i].name}, obj.data.activeActivity);
                }
                
                if (activities[i].selected){
                    obj.selectActivity(activities[i].name);
                    activities = obj.getActivities();
                    
                    obj.startSelectedActivity(activities[i].name);
                    activities = obj.getActivities();
                }
                
                activities[i].idle = false;
                
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
                
                    activities[i].active = false;
                }
            }
            
            if (selectedActivity === "undefined" || !selectedActivity){
                throw "Could not find selected activity";
            }
        
            
            /* Calculation logic */
            
            var dataBlock; // Holds reference to data block we will be modifying
            var currentTime = Date.now();
            var currentDate = new Date().toJSON();            
            
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
                currentDate = new Date(currentTime);
                
                // Look at the most recent data block                                
                dataBlock = selectedActivity.data[selectedActivity.data.length - 1];                    
                activityDataDate = new Date(dataBlock.date).setHours(0, 0, 0, 0);
                
                // If the current date is greater than the
                // date of the data block, we need to create
                // a new data block for this activity
                if (currentDate.setHours(0, 0, 0, 0) > activityDataDate){
                
                    // Create new data block
                    selectedActivity.data.push({
                        time: 0,
                        date: currentDate.toJSON(),
                        timestamp: currentTime
                    });
                } 

                // If date of the data block is today
                else if (currentDate.setHours(0, 0, 0, 0) == activityDataDate){
                    
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
            var currentDate = new Date(currentTime);
            var activityDataDate;
            
            // Loop through all activities
            for (var i = 0; i < activities.length; i++){
            
                for (var j = 0; j < activities[i].data.length; j++){
                
                    // Get date of the data block of the activity
                    activityDataDate = new Date(activities[i].data[j].date).setHours(0, 0, 0, 0);
                    
                    // If the date of the data block and the current day are the same,
                    // we don't have to make a new data block
                    if (currentDate.setHours(0, 0, 0, 0) == activityDataDate){
                    
                        // Don't calculate anything if there is no need to
                        if (activities[i].data[j].timestamp != 0){
                        
                            activities[i].data[j].time += (currentTime - activities[i].data[j].timestamp);
                            
                            // Our timestamp is re-assigned to the current time
                            // if the activity is active, otherwise it is set to zero
                            activities[i].data[j].timestamp = (activities[i].active ? currentTime : 0);                            
                        }
                    } else if (currentDate.setHours(0, 0, 0, 0) > activityDataDate){
                 
                        // Since the current day has passed the last recorded day for the activity,
                        // we need to calculate the time that hasn't been accounted for the previous
                        // day before we calculate the time for the current day
                        
                        // Get the time of the end of the last recorded day
                        var endOfActivityDataDate = new Date(activities[i].data[j].date).setHours(23, 59, 59, 999);
                        var addToDataBlock = endOfActivityDataDate - activityDataDate;
                        
                        activities[i].data[j].time += addToDataBlock;
                        activities[i].data[j].timestamp = 0;
                        
                        // Make a new data block for the current day
                        var newDataBlockDate = new Date().toJSON();
                        var newDataBlockTime = currentTime - currentDate.setHours(0, 0, 0, 0);
                        
                        activities[i].data.push({
                            date: newDataBlockDate,
                            time: newDataBlockTime,
                            timestamp: (activities[i].active ? currentTime : 0) // Set to currentTime if active, otherwise it is zero
                        });
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
                    
                    // Remove activity
                    activities.splice(i, 1);
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
                    
            activities[index].data[lastDataBlock].time += (currentTime - activities[index].data[lastDataBlock].timestamp);                            
            activities[index].data[lastDataBlock].timestamp = (newTimestamp ? currentTime : 0);
            
            return activities;
        }
    };
    
    return obj;
});

app.factory("graphService", ["activityService", function(activityService){

    var obj = {
        
        // Holds all data
        data: {
            chart: {}
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
        initChart: function(){
        
            var chart = {};
            
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
                "height": 400,
                "width": 400,
                legend: {
                    position: "none"
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
            
            
            var graph = obj.initChart();
            var data = activityService.getActivities();
            var tempDate = new Date(); tempDate = tempDate.setHours(0, 0, 0, 0);
            var dayInMilliseconds = 1000 * 3600 * 24;
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
                    
                    graph.data.rows[i].c[1].v = graph.data.rows[i].c[1].v / totalActivityTime * 100;
                }
            }
            
            // Needed to update controllers properly
            angular.copy(graph, obj.data.chart);
        }
    };
    
    return obj;
}]);

app.service("dataService", function () {

    this.getActivities = function () {

        if (docCookies.hasItem("activities")) {

            var activities = JSON.parse(docCookies.getItem("activities"));

            if (activities.constructor != Array) {

                activities = [activities];
            }

            activities.sort(
                function (a, b) {
                    if (a.name > b.name) { return 1; }
                    if (b.name < a.name) { return -1; }
                    return 0;
                });

            console.log(activities)
            return activities;
        }

        return [];
    }
    
    this.getActiveActivity = function(){
    
        var activities = this.getActivities();
        
        if (activities.length == 0){
        
            $(".js-current-activity").text("Not currently tracking time for any activity");
        } else {
        
            for (var i = 0; i < activities.length; i++){
            
                if (activities[i].active) {
                    $(".js-current-activity").text("Tracking time for " + activities[i].name);
                    
                    return activities[i].name;
                }
            }
        }
        
        return "";
    }

    this.saveActivity = function (activity) {

        if (!docCookies.hasItem("activities")) {

            docCookies.setItem("activities", [JSON.stringify({ "name": activity, "active": true })], Infinity);
        } else {

            var activities = this.getActivities();

            for (var i = 0; i < activities.length; i++) {
                
                if (activities[i].name == activity) {
                    throw "Activity already exists";
                }
            }

            activities.push({ "name": activity, "active": false });
            docCookies.setItem("activities", JSON.stringify(activities), Infinity);
        }
        
    };

    this.activateActivity = function (activity) {

        var activities = this.getActivities();

        for (var i = 0; i < activities.length; i++) {

            activities[i].active = false;

            if (activities[i].name == activity.name) {

                activities[i].active = true;
            }
        }

        docCookies.setItem("activities", JSON.stringify(activities), Infinity);
    };

    this.startActivity = function (activity) {

        var activities;
        var isActivitySaved = false;
        var currentTime = Date.now();
        var currentDate = new Date().toJSON();

        if (!docCookies.hasItem("activitiesTime")) {

            activities = {
                "name": activity.name,
                data: [{
                    "date": currentDate,
                    "time": 0,
                    "timestamp": currentTime
                }]
            };

            activities = [activities];
        } else {

            activities = JSON.parse(docCookies.getItem("activitiesTime")) || [];

            for (var i = 0;i < activities.length; i++) {

                if (activities[i].name == activity.name) {

                    isActivitySaved = true;
                    activities[i].data[activities[i].data.length - 1].timestamp = currentTime;
                } else {

                    if (activities[i].data[activities[i].data.length - 1].timestamp != null) {
                        activities[i].data[activities[i].data.length - 1].time += (currentTime - activities[i].data[activities[i].data.length - 1].timestamp);
                    }
                    
                    activities[i].data[activities[i].data.length - 1].timestamp = null;
                }
            }

            if (!isActivitySaved) {

                activities.push({
                    "name": activity.name,
                    data: [{
                        "date": currentDate,
                        "time": 0,
                        "timestamp": currentTime
                    }]
                });
            }            
        }

        docCookies.setItem("activitiesTime", JSON.stringify(activities), Infinity);
    };

    this.calculateTime = function () {

        var activities = JSON.parse(docCookies.getItem("activitiesTime")) || [];
        var currentTime = Date.now();
        var currentDay = new Date(currentTime);
        var activityDay;

        for (var i = 0; i < activities.length; i++) {

            activityDay = new Date(activities[i].data[activities[i].data.length - 1].date).setHours(0, 0, 0, 0);

            // If we crossed into the next day
            if (activityDay != currentDay.setHours(0, 0, 0, 0)) {

                if (activities[i].data.length == 7) {
                    activities[i].data.shift();
                }

                activities[i].data.push({ "date": currentDay.toJSON(), "time": 0, "timestamp": currentTime });
            } else {

                if (activities[i].data[activities[i].data.length - 1].timestamp != null) {

                    activities[i].data[activities[i].data.length - 1].time += (currentTime - activities[i].data[activities[i].data.length - 1].timestamp);
                    activities[i].data[activities[i].data.length - 1].timestamp = currentTime;
                }
            }
        }

        docCookies.setItem("activitiesTime", JSON.stringify(activities), Infinity);
    };

    this.formatChartInformation = function (day) {

        /*
            [{
                "name": activityName,
                data: [{
                    "date": currentDate,
                    "time": 0,
                    "timestamp": currentTime
                }]
            }];
        */
        var rawData = JSON.parse(docCookies.getItem("activitiesTime")) || [];

        var activityTimes = [];
        var totalActivityTime = 0;
        var individualActivityTime = 0;
        var day;

        for (var i = 0; i < rawData.length; i++) {

            for (var j = 0; j < rawData[i].data.length; j++) {

                if (rawData[i].data[j].time > 0) {

                    totalActivityTime += rawData[i].data[j].time;
                    individualActivityTime += rawData[i].data[j].time;

                    var years = rawData[i].data[j].time / 1000 / 60 / 60 / 24 / 7 / 52;
                    var weeks = years % 1 * 52;
                    var days = weeks % 1 * 7;
                    var hours = days % 1 * 24;
                    var minutes = hours % 1 * 60;
                    var seconds = minutes % 1 * 60;
                    var miliseconds = seconds % 1 * 1000;

                    years = Math.floor(years);
                    weeks = Math.floor(weeks);
                    days = Math.floor(days);
                    hours = Math.floor(hours);
                    minutes = Math.floor(minutes);
                    seconds = Math.floor(seconds);
                    miliseconds = Math.floor(miliseconds);

                    var strTime = "";

                    if (years != 0) { strTime += years + "y - "; }
                    if (weeks != 0) { strTime += weeks + "w - "; }
                    if (days != 0) { strTime += days + "d - "; }
                    if (hours != 0) { strTime += hours + "h - "; }
                    if (minutes != 0) { strTime += minutes + "m - "; }
                    if (seconds != 0) { strTime += seconds + "s - "; }
                    if (miliseconds != 0) { strTime += miliseconds + "ms - "; }

                    if (strTime.length >= 3) {

                        strTime = strTime.substring(0, strTime.length - 3);
                    }

                    activityTimes.push({
                        name: rawData[i].name,
                        time: individualActivityTime,
                        strTime: strTime
                    });

                    individualActivityTime = 0;
                }
            }
        }

        activityTimes.push(totalActivityTime);

        return activityTimes;
    };

    this.buildChart = function (day) {

        var graphObj = {list: []};
        var graph = {};
        var graphData = this.formatChartInformation(" ");
        var activeActivityName = this.getActiveActivity();

        var rowsData = [];

        graph.data = {
            "cols": [{
                id: "A",
                label: "Activity",
                type: "string"
            },
            {
                id: "B",
                label: "Time",
                type: "string"
            }]
        }

        for (var i = 0; i < graphData.length - 1; i++) {

            rowsData.push({
                c: [
                    { v: graphData[i].name }, // name of activity
                    {
                        v: graphData[i].time / graphData[graphData.length - 1] * 100, // % of total time
                        f: graphData[i].strTime // string representation of time
                    }
                ]
            });
            
            graphObj.list.push({
                name: graphData[i].name,
                value: Math.floor(graphData[i].time / graphData[graphData.length - 1] * 100),
                str: graphData[i].strTime,
                active: (activeActivityName != "" && graphData[i].name == activeActivityName)
            });
        }

        graph.data.rows = rowsData;
        graph.type = "PieChart";
        graph.options = {            
            "height": 400,
            "width": 400,
            legend: {
                position: "none"
            }
        };

        graphObj.graph = graph;
        
        graphObj.list.sort(
                function (a, b) {
                    if (a.value > b.value) { return 1; }
                    if (b.value < a.value) { return -1; }
                    return 0;
                });
        
        return graphObj;
    };
});

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
        
            debugger;
            var obj = activityService.getActivities();
            
            var promise = $http.post('/update', obj, {
                transformRequest: function(data, headersGetter){
                    return JSON.stringify(data);
                },
                transformResponse: function(data, headersGetter){
                    return JSON.stringify(data);
                }
            });
            
            return promise;
        }
    
    };    
    
    return o;
}]);

app.controller("userCtrl", ["$scope", "user", function ($scope, user) {

    $scope.user = user.user;
    
    user.getMe().success(function(a){
        // to-do?
    }).error(function(b){
        // to-do?
    });
     
    user.update();
 }]);

app.controller("activityCtrl", ["$scope", "$interval", "activityService", "graphService", function ($scope, $interval, activityService, graphService) {

    $scope.activities = activityService.data.activities;
    activityService.initActivities();
    
    $scope.googlechart = graphService.data.chart;
    $scope.activeActivity = activityService.data.activeActivity;
    $scope.idleActivity = activityService.data.idleActivity;
    
    graphService.createChart("0");
    
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
    
    // Generates the chart
    $scope.generateChart = function(){
        
        try
        {
            graphService.createChart("0");
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
            graphService.createChart("0");
            
            $interval(function(){
                graphService.createChart("0");
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