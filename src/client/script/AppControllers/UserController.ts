
namespace AppControllers {
  "use strict";

  export class UserController {
    static $inject = ["$scope", AppString.MessageService];
    constructor($scope, MessageService: AppServices.MessageService) {
    }
  }
}

