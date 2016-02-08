
namespace AppControllers {
  "use strict";

  export class TasksController {
    static $inject = ["$scope", "$filter", AppString.CacheService];
    constructor($scope, $filter: angular.IFilterProvider, cache: AppServices.CacheService) {
      $scope.task = undefined;

      var tasksPromise = cache.get<Shared.ISearchResults>(AppModule.LoaderSettings.endpoint, "/search/tasks");

      tasksPromise.then(function(taskResults) {
        // Intellisense is available here through a d.ts file shared with the serve code base
        var name = taskResults.data[0].hits.hits[0]._source.name;
        $scope.task = taskResults.data[0].hits.hits[0]._source;
      });
    }
  }
}

