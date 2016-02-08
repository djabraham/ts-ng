
namespace AppControllers {
  "use strict";

  export class SettingsController {
    static $inject = ["$scope", AppString.MessageService];
    constructor($scope, MessageService: AppServices.MessageService) {
    }
  }
}

