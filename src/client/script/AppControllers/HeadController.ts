
namespace AppControllers {
  "use strict";

  export class HeadController {
    static $inject = ["$scope", AppString.MessageService, AppString.ResourceService];
    constructor($scope, MessageService: AppServices.MessageService, ResourceService: AppServices.ResourceService) {
    }
  } 
}

