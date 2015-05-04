/*************************************
/
/   CONFIG
/
/
*************************************/
angular.module("myapp").config([
    "$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        
        // Configure urls for our application
        $stateProvider
            .state("home",
                {
                    url: "/home",
                    views: {
                        "hub": {
                            templateUrl: "/views/partials/activitiesSubmenu.html",
                            controller: "activityCtrl"
                        },
                        "accountHub": {
                            templateUrl: "/views/partials/userHub.html",
                            controller: "userCtrl"
                        }
                    }
                }
            )
            .state("graph",
                {
                    url: "/home/graph",
                    views: {
                        "hub": {
                            templateUrl: "/views/partials/graphSubmenu.html",
                            controller: "activityCtrl"                            
                        },
                        "accountHub": {
                            templateUrl: "/views/partials/userHub.html",
                            controller: "userCtrl"
                        }
                    }
                }
            )
            .state("details",
                {
                    url: "/home/details",
                    views: {
                        "hub": {
                            templateUrl: "/views/partials/detailsSubmenu.html",
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
        
            
        $urlRouterProvider.otherwise("home");
    }
]);