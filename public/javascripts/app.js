
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
            
        $urlRouterProvider.otherwise("index");
    }
]);

app.run(["$rootScope", function ($rootScope) {

    (function () {
        /*
            Sets up cookies for our app:
            

            "balanceCookiesHasVisited" User has been to the app before
            "balanceCookiesActivities" Activities user has made and/or kept track of
            "balanceCookiesActivitiesTime" Time alloted for each activity

        */

        if (docCookies.getItem("balanceCookiesHasVisited") == null) {
            
            docCookies.removeItem("balanceCookiesHasVisited");
            docCookies.removeItem("balanceCookiesActivities");
            docCookies.removeItem("balanceCookiesActivitiesTime");

            docCookies.setItem("balanceCookiesHasVisited", true, Infinity);
        }
        
    }())

}]);



app.factory("userService", function() {
    var o = {};
    
    o.ref = new Firebase("https://balanceapp.firebaseio.com");
    
    return o;
});



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

app.factory("user", ["$http", "dataService", function($http, dataService){
    
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
            var obj = JSON.parse(docCookies.getItem("activitiesTime")) || [];
            
            var promise = $http.post('/update', obj);
            
            return promise;
        }
    
    };    
    
    return o;
}]);

app.controller("activityCtrl", ["$scope", "$interval", "dataService", function ($scope, $interval, dataService) {
    
    $scope.newActivity = "";
    $scope.graphData = {};
    $scope.activities = dataService.getActivities();
    
    dataService.getActiveActivity();

    $scope.save = function (activity) {

        try{
            if (activity != "") {
                dataService.saveActivity(activity);

                $scope.newActivity = "";
                $scope.activities = dataService.getActivities();
            }
        } catch (e) {
            alert(e);
        }        
    }    

    $scope.activate = function activate(activity) {

        dataService.activateActivity(activity);
    }

    $scope.start = function start(activity) {

        $(".js-current-activity").text("Tracking time for: " + "[" + activity.name + "]");

        dataService.startActivity(activity);
    }

    $scope.calculateTime = function calculateTime() {

        dataService.calculateTime();

        $(".js-create-graph").attr("disabled", true);

        $interval(function () {
            dataService.calculateTime();
        }, 5000);
    };

    $scope.$watch(function () {

        return docCookies.getItem("activities");
    }, function (oldVal, newVal) {

        $scope.activities = dataService.getActivities();
    });

    $scope.$watch(function () {

        return docCookies.getItem("activitiesTime");
    }, function (oldVal, newVal) {

        var obj = dataService.buildChart();
        
        $scope.graphData.graph = obj.graph;
        $scope.graphData.list = obj.list;
    });
    
}]);


app.controller("userCtrl", ["$scope", "userService", "user", function ($scope, userService, user) {

    $scope.test = "hi";
    
    $scope.user = user.user;
    
    user.getMe().success(function(a){
        // to-do?
    }).error(function(b){
        // to-do?
    });
    
    user.update();
}]);