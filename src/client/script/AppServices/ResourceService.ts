
namespace AppServices {
  "use strict";

  /** Resources are stored in this format */
  export class ResourceDefinition<T> {
    modified: boolean = false;
    journal: Journal = new Journal;

    constructor(
      public date: Date,
      public branch: string,
      public type: string,
      public label: string,
      public route: string,
      public path: string,
      public data: T) {

      this.journal.add(JournalEntryType.Loaded, true, date);
    }

    get hash() {
      // a Resource hash is based on the branch and data path
      return ResourceService.key(this.branch, this.path);
    }
  };

  export interface ResourceRequest {
    branch: string; type: string; label: string; route: string; path: string; force: boolean;
  }

  /** Resources are considered formal or significant data types; for example, an application's editable data. */
  export class ResourceService {
    static $inject = ["$q", AppString.CacheService];
    constructor(private $q: angular.IQService, private cacheService: AppServices.CacheService) { }

    verbosity: number = 1;
    resources: { [id: string]: ResourceDefinition<any> } = {};

    static key(branch: string, path: string) {
      return branch + "/" + path;
      //var hashBasis = branch.joinPath(path);
      //return "R" + hashBasis.HashFnv32u() + "L" + hashBasis.length; //.toString().lpad('0', 4);
    }
    has(branch: string, path: string): boolean {
      return this.resources.hasOwnProperty(ResourceService.key(branch, path));
    }
    rem(branch: string, path: string): void {
      delete this.resources[ResourceService.key(branch, path)];
    }
    link<T>(branch: string, path: string): ResourceDefinition<T>;
    link(branch: string, path: string): ResourceDefinition<any> {
      return this.resources[ResourceService.key(branch, path)];
    }
    load<T>(branch: string, type: string, label: string, route: string, path: string, force: boolean): angular.IPromise<ResourceDefinition<T>>;
    load(branch: string, type: string, label: string, route: string, path: string, force: boolean): angular.IPromise<any> {
      var key = ResourceService.key(branch, path);

      var date = new Date();
      var promise = this.cacheService.get(route, path, force);

      return promise.then(
        function(data) {
          if (this.verbosity > 0) {

            // resource load times are also included in relativity build time
            console.log("Resource Service: (" + ((new Date().getMilliseconds() - date.getMilliseconds()) / 1000.0) + "s) Loaded " + key);
          }

          if (!this.resources.hasOwnProperty(key)) {
            this.resources[key] = new ResourceDefinition(date, branch, type, label, route, path, data);
          } else {
            if (force) {
              this.resources[key].data = data;
              this.resources[key].journal.add(JournalEntryType.Refreshed, true, date);
              this.resources[key].modifed = false;
              // MessageBus.emit("Resource.reloaded", { resource: this.resources[key] });
            }
          }

          return this.resources[key];
        },
        function(reason) {
          if (this.resources.hasOwnProperty(key)) {
            this.resources[key].journal.add(JournalEntryType.Error, false, date, { reason: reason });
          }

          return null;
        }
      );
    }
    many(requests: ResourceRequest[]): angular.IPromise<any> {

      // for loading an item, along with dependencies
      if (requests && requests.length) {
        var promises = [];

        // e.g. loading resource and dependencies in parallel
        // promises.push(this.load(branch, type, label, route, path, force));

        for (var d = 0; d < requests.length; d++) {
          var r = requests[d];
          promises.push(this.load(r.branch, r.type, r.label, r.route, r.path, r.force));
        }

        return this.$q.all(promises);
      }
    }
    reload<T>(resource: ResourceDefinition<any>): angular.IPromise<ResourceDefinition<T>>;
    reload(resource: ResourceDefinition<any>): angular.IPromise<any> {
      return this.load(resource.branch, resource.type, resource.label, resource.route, resource.path, true);
    }
  }
}
