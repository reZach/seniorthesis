
angular.module("myapp").controller("activityCtrl", ["$scope", "$interval", "activityService", "graphService", "pieSliceColorService", function ($scope, $interval, activityService, graphService, pieSliceColorService) {

    $scope.activities = activityService.data.activities;
    activityService.initActivities();
    pieSliceColorService.init();
    
    $scope.googlechart = graphService.data.chart;
    $scope.googlechartdetails = graphService.data.details;
    $scope.activeActivity = activityService.data.activeActivity;
    $scope.idleActivity = activityService.data.idleActivity;
    $scope.selectedActivity = activityService.data.selectedActivity;
    $scope.graphDate = graphService.data.date;
    $scope.graphDay = 0;
    
    
    graphService.createChart($scope.graphDay);
        
    
    // Creates a new activity
    $scope.newActivity = function(activityName){
    
        try
        {
            activityService.addActivity(activityName);
            $scope.newActivityName = "";
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
        
                $(".js-autogenerate-chart").addClass("fa-pulse active");
                $(".js-autogenerate-chart").parent().attr("disabled", true);
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