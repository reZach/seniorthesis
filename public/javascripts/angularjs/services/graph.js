
// Service that handles graph logic
angular.module("myapp").factory("graphService", ["activityService", "pieSliceColorService", function(activityService, pieSliceColorService){

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
                height: 300,
                width: 300,
                backgroundColor: "#ffffff",
                title: graphTitle,
                legend: {
                    position: "none"
                },
                pieSliceTextStyle: {
                    color: "black", 
                    fontName: "Muli, sans-serif", 
                    fontSize: 14
                },
                titleTextStyle: {
                    color: "black", 
                    fontName: "Muli, sans-serif", 
                    fontSize: 14
                },
                tooltip: {
                    textStyle: {
                        color: "black", 
                        fontName: "Muli, sans-serif", 
                        fontSize: 14
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