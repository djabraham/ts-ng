
namespace AppServices {
  "use strict";

  // Simple pubsub message bus that facilitates auto-unbind as scopes are destroyed
  //   just pass null scope in cases where this is listening within a persistant service
  export class MessageService {
    static $inject = ["$rootScope"]; // , "ngToast"];
    static lastAlertMessage: string = undefined;

    constructor(private $rootScope: angular.IRootScopeService) {}; //, private ngToast: any) { }

    // if a scope with a listener is destroyed, the it never gets garbage collected
    // controllers should pass in scope, so when the scope is destroyed this listener unbinds
    // when called from a service, this does not need the scope because services are singletons
    public on(msg, func, scope?) {
      var unbind = this.$rootScope.$on(msg, func);    // return value of $on is an unbind() function

      if (scope)
        scope.$on("$destroy", unbind);  // listening for destruction of provided $scope to unbind
            
      return unbind;                    // storing and calling return value also unbinds
    };

    public emit(msg, data) {
      data = data || {}
      this.$rootScope.$emit(msg, data);
    };

    public alert(msg: string, style?: string, crash?: boolean, data?: any) {
      if (msg != MessageService.lastAlertMessage) {

        // this.ngToast.create({ content: msg, dismissButton: true, className: style || "danger", timeout: 10000 });
        alert(msg);
        MessageService.lastAlertMessage = msg;

        window.setTimeout(function() {
          MessageService.lastAlertMessage = undefined;
        }, 2000);
      }

      if (crash) {
        if (data) console.log("ALERT DATA: ", data);
        throw (msg);
      } else {
        if (data)
          console.log(msg, data);
        else
          console.log(msg);
      }
    }

  }
}
