
namespace AppServices {
  "use strict";

  // Simple low level cache used for fetching formal data (resources) and informal data (meta, enums, etc).
  // If you intend to make changes to the data, then it should probably be promoted to a Resource instead.
  export class CacheService {
    static $inject = ["$http", "$q"];
    constructor(private $http: angular.IHttpService, private $q: angular.IQService) { }

    static cache: { [id: string]: any } = {};

    // Use this when a cached item needs replaced
    public set(servicePath: string, dataPath: string, data: any): any {
      var pathFull = servicePath.joinPath(dataPath);
      var pathHash = pathFull;

      CacheService.cache[pathHash] = data;
      return CacheService.cache[pathHash];
    }

    // This overload retrieves a typed object
    public get<T>(servicePath: string, dataPath: string, force?: boolean): angular.IPromise<T>; 

    // Retrieves items from server and keys them
    public get(servicePath: string, dataPath: string, force?: boolean) {     // force is destructive!

      var deferred = this.$q.defer();
      var pathFull = servicePath.joinPath(dataPath);

      var pathHash = pathFull; // .HashFnv32u();
      if (!force && CacheService.cache.hasOwnProperty(pathHash)) {

        // data was avail, so promise can be resolved before even returning it
        deferred.resolve(CacheService.cache[pathHash]);
        return deferred.promise;
      };

      this.$http.get(pathFull)
        .success(function(response) {
          if (!response) {
            console.log("Cache Service: Error " + pathFull);
            deferred.reject();
            return;
          }

          console.log("Cache Service: Caching " + pathFull);

          var doc = response;
          CacheService.cache[pathHash] = doc;
          deferred.resolve(CacheService.cache[pathHash]);
        })
        .error(function(response) {
          console.log("Cache Service: Error " + pathFull);
          deferred.reject();
        });

      return deferred.promise;
    }
  }
}

