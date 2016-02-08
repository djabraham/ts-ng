//
// The main Application module (AppModule)
//

// Angular services and controllers may implement AppClassAngular
interface IAppClassAngular {
  // non static properties can be enforced here
}

interface IAppClassAngularStatic {
  new():IAppClassAngular;
  $inject: string[];   // Angular injects classes declared in this array into the module

  // static properties can be enforced here
}

// These ts files are transpiled into js and merged into one (app.js), in no particular order.
// Root variables can be accessed within modules, which are self executing functions.
// Another type of output that is not shown in this demo are packaged modules.
// Check the output (app.js) in the dist folder for clarification.

// Typescript has support for JsDocs format comments, and will intellisense these
// Hover over AppString to see this in action..

/** This is a globally available variable (but not on window) */
var AppString = {
  CacheService: "CacheService",
  ResourceService: "ResourceService",
  MessageService: "MessageService",
  UserService: "UserService",
  UserController: "UserController",
  TasksController: "TasksController",
  SettingsController: "SettingsController",
  HeadController: "HeadController",
  BodyController: "BodyController"
}

namespace AppModule {
  'use strict';

  // Interface describes settings
  export interface ILoaderSettings {
    endpoint: string;
  }

  // Instantiated settings
  export var LoaderSettings: ILoaderSettings = {
    endpoint: "/api"
  };

  // This will not execute until all of the module code has been instantiated
  angular.element(document).ready(function() {

    // Creating an Angular Main Module
    var ngModule = angular.module('AppModule', [
      // inject 3rd-party dependencies here (i.e. ngToast)
    ])
    .service(AppString.CacheService, AppServices.CacheService)
    .service(AppString.ResourceService, AppServices.ResourceService)
    .service(AppString.MessageService, AppServices.MessageService)
    .service(AppString.UserService, AppServices.UserService)
    .controller(AppString.UserController, AppControllers.UserController)
    .controller(AppString.HeadController, AppControllers.HeadController)
    .controller(AppString.BodyController, AppControllers.BodyController)
    .controller(AppString.SettingsController, AppControllers.SettingsController)
    .controller(AppString.TasksController, AppControllers.TasksController)
    // .directive(AppString.MyDirective, AppDirectives.MyDirective)

    // Configuring the Angular AppModule
    ngModule.config(function($httpProvider) {

      // $http interceptor to capture ajax errors
      $httpProvider.interceptors.push(["$q", "$rootScope", "$injector",
        function($q, $rootScope, $injector, ngToast) {

          return {
            request: function(config) {
              // $("spinner").show();
              return config || $q.when(config);
            },
            response: function(response) {
              // if ($injector.get("$http").pendingRequests.length < 1)
              //    $("spinner").hide();

              return response || $q.when(response);
            },
            responseError: function(rejection) {
              // $("spinner").hide();
              // if (rejection.status === 401) {
              //    $rootScope.status.returnToStateName = $injector.get("$state").current.name;
              //    $state = $injector.get("$state").go("login");
              // }

              alert("Ajax error!");
              return $q.reject(rejection);
            }
          }
        }
      ])
    })
    .config(["$locationProvider", function($locationProvider) {
      $locationProvider.html5Mode;
    }])

    // Bootstrapping Angular using the AppModule
    // This replaces the attribute (i.e. <html ng-app="AppModule">)
    var injector = angular.bootstrap(document, ['AppModule']);
    var tst;
  });
}






