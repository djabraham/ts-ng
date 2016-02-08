
namespace AppServices {
  "use strict";

  // This defines a $resource.promise merged with the type of data returned by the API
  export interface IApiUserInfo extends ng.resource.IResource<IApiUserInfo> {
    Name: string;
    UserName: string;
    AuthenticationType: string;
    IsAuthenticated: boolean;
    GroupsEffective: string[];
    GroupsActual: string[];
  }

  // This defines any custom methods supported by the $resource
  export interface IApiUserInfoResource extends ng.resource.IResourceClass<IApiUserInfo> {
    setGroups(groups: string[]): IApiUserInfo;
    // get(): IApiUserInfo; is predefined
  }

  // Throwing in example of a $resource in TypeScript, could have used CacheService or $http methods too.

  // An angular $resource returns a promise that will have properties of the req data added to it eventually.
  // So the returned object will occupy the same address when the promise resolves; thus these are ideal for
  // angular bindings, as they can be setup immediately upon return.

  export class UserService implements IAppClassAngular {
    static stub = "app/user";
    static $inject = ["$resource"];
    constructor(private $resource: angular.resource.IResourceService, private $q: angular.IQService) {
      var userInfoPath = AppModule.LoaderSettings.endpoint.joinPath(UserService.stub);
      this.userResource = <IApiUserInfoResource>this.$resource(userInfoPath, null,
        {
          setGroups: { method: "POST", params: { action: "GetUser" } },
          get: { method: "GET", cache: true, isArray: false, params: { action: "GetUser" } },
        })

      this.userResource.get();
    }

    userResource: IApiUserInfoResource;

    isMemberOf(user: IApiUserInfo, group: string, actual: boolean) {
      if (!actual)
        return (user.GroupsEffective.indexOf(group) >= 0)
      else
        return (user.GroupsActual.indexOf(group) >= 0)
    }

    // setGroups(groups: string[]) {
    //    this.userResource.setGroups(groups);
    // }
  }
}

