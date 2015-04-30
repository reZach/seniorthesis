
// Service that controls pie slice colors
angular.module("myapp").factory("pieSliceColorService", function() {

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