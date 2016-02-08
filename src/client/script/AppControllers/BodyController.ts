
namespace AppControllers {
  "use strict";

  export class BodyController {
    static $inject = ["$scope", AppString.MessageService, AppString.ResourceService];
    constructor($scope, MessageService: AppServices.MessageService, ResourceService: AppServices.ResourceService) {
      $scope.settings = AppModule.LoaderSettings;
    }
  }
}
