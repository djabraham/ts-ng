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
};
var AppModule;
(function (AppModule) {
    'use strict';
    AppModule.LoaderSettings = {
        endpoint: "/api"
    };
    angular.element(document).ready(function () {
        var ngModule = angular.module('AppModule', [])
            .service(AppString.CacheService, AppServices.CacheService)
            .service(AppString.ResourceService, AppServices.ResourceService)
            .service(AppString.MessageService, AppServices.MessageService)
            .service(AppString.UserService, AppServices.UserService)
            .controller(AppString.UserController, AppControllers.UserController)
            .controller(AppString.HeadController, AppControllers.HeadController)
            .controller(AppString.BodyController, AppControllers.BodyController)
            .controller(AppString.SettingsController, AppControllers.SettingsController)
            .controller(AppString.TasksController, AppControllers.TasksController);
        ngModule.config(function ($httpProvider) {
            $httpProvider.interceptors.push(["$q", "$rootScope", "$injector",
                function ($q, $rootScope, $injector, ngToast) {
                    return {
                        request: function (config) {
                            return config || $q.when(config);
                        },
                        response: function (response) {
                            return response || $q.when(response);
                        },
                        responseError: function (rejection) {
                            alert("Ajax error!");
                            return $q.reject(rejection);
                        }
                    };
                }
            ]);
        })
            .config(["$locationProvider", function ($locationProvider) {
                $locationProvider.html5Mode;
            }]);
        var injector = angular.bootstrap(document, ['AppModule']);
        var tst;
    });
})(AppModule || (AppModule = {}));
var AppControllers;
(function (AppControllers) {
    "use strict";
    var BodyController = (function () {
        function BodyController($scope, MessageService, ResourceService) {
            $scope.settings = AppModule.LoaderSettings;
        }
        BodyController.$inject = ["$scope", AppString.MessageService, AppString.ResourceService];
        return BodyController;
    })();
    AppControllers.BodyController = BodyController;
})(AppControllers || (AppControllers = {}));
var AppControllers;
(function (AppControllers) {
    "use strict";
    var HeadController = (function () {
        function HeadController($scope, MessageService, ResourceService) {
        }
        HeadController.$inject = ["$scope", AppString.MessageService, AppString.ResourceService];
        return HeadController;
    })();
    AppControllers.HeadController = HeadController;
})(AppControllers || (AppControllers = {}));
var AppControllers;
(function (AppControllers) {
    "use strict";
    var SettingsController = (function () {
        function SettingsController($scope, MessageService) {
        }
        SettingsController.$inject = ["$scope", AppString.MessageService];
        return SettingsController;
    })();
    AppControllers.SettingsController = SettingsController;
})(AppControllers || (AppControllers = {}));
var AppControllers;
(function (AppControllers) {
    "use strict";
    var TasksController = (function () {
        function TasksController($scope, $filter, cache) {
            $scope.task = undefined;
            var tasksPromise = cache.get(AppModule.LoaderSettings.endpoint, "/search/tasks");
            tasksPromise.then(function (taskResults) {
                var name = taskResults.data[0].hits.hits[0]._source.name;
                $scope.task = taskResults.data[0].hits.hits[0]._source;
            });
        }
        TasksController.$inject = ["$scope", "$filter", AppString.CacheService];
        return TasksController;
    })();
    AppControllers.TasksController = TasksController;
})(AppControllers || (AppControllers = {}));
var AppControllers;
(function (AppControllers) {
    "use strict";
    var UserController = (function () {
        function UserController($scope, MessageService) {
        }
        UserController.$inject = ["$scope", AppString.MessageService];
        return UserController;
    })();
    AppControllers.UserController = UserController;
})(AppControllers || (AppControllers = {}));
var AppServices;
(function (AppServices) {
    "use strict";
    var CacheService = (function () {
        function CacheService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        CacheService.prototype.set = function (servicePath, dataPath, data) {
            var pathFull = servicePath.joinPath(dataPath);
            var pathHash = pathFull;
            CacheService.cache[pathHash] = data;
            return CacheService.cache[pathHash];
        };
        CacheService.prototype.get = function (servicePath, dataPath, force) {
            var deferred = this.$q.defer();
            var pathFull = servicePath.joinPath(dataPath);
            var pathHash = pathFull;
            if (!force && CacheService.cache.hasOwnProperty(pathHash)) {
                deferred.resolve(CacheService.cache[pathHash]);
                return deferred.promise;
            }
            ;
            this.$http.get(pathFull)
                .success(function (response) {
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
                .error(function (response) {
                console.log("Cache Service: Error " + pathFull);
                deferred.reject();
            });
            return deferred.promise;
        };
        CacheService.$inject = ["$http", "$q"];
        CacheService.cache = {};
        return CacheService;
    })();
    AppServices.CacheService = CacheService;
})(AppServices || (AppServices = {}));
var AppServices;
(function (AppServices) {
    "use strict";
    var MessageService = (function () {
        function MessageService($rootScope) {
            this.$rootScope = $rootScope;
        }
        ;
        MessageService.prototype.on = function (msg, func, scope) {
            var unbind = this.$rootScope.$on(msg, func);
            if (scope)
                scope.$on("$destroy", unbind);
            return unbind;
        };
        ;
        MessageService.prototype.emit = function (msg, data) {
            data = data || {};
            this.$rootScope.$emit(msg, data);
        };
        ;
        MessageService.prototype.alert = function (msg, style, crash, data) {
            if (msg != MessageService.lastAlertMessage) {
                alert(msg);
                MessageService.lastAlertMessage = msg;
                window.setTimeout(function () {
                    MessageService.lastAlertMessage = undefined;
                }, 2000);
            }
            if (crash) {
                if (data)
                    console.log("ALERT DATA: ", data);
                throw (msg);
            }
            else {
                if (data)
                    console.log(msg, data);
                else
                    console.log(msg);
            }
        };
        MessageService.$inject = ["$rootScope"];
        MessageService.lastAlertMessage = undefined;
        return MessageService;
    })();
    AppServices.MessageService = MessageService;
})(AppServices || (AppServices = {}));
var AppServices;
(function (AppServices) {
    "use strict";
    var ResourceDefinition = (function () {
        function ResourceDefinition(date, branch, type, label, route, path, data) {
            this.date = date;
            this.branch = branch;
            this.type = type;
            this.label = label;
            this.route = route;
            this.path = path;
            this.data = data;
            this.modified = false;
            this.journal = new AppServices.Journal;
            this.journal.add(AppServices.JournalEntryType.Loaded, true, date);
        }
        Object.defineProperty(ResourceDefinition.prototype, "hash", {
            get: function () {
                return ResourceService.key(this.branch, this.path);
            },
            enumerable: true,
            configurable: true
        });
        return ResourceDefinition;
    })();
    AppServices.ResourceDefinition = ResourceDefinition;
    ;
    var ResourceService = (function () {
        function ResourceService($q, cacheService) {
            this.$q = $q;
            this.cacheService = cacheService;
            this.verbosity = 1;
            this.resources = {};
        }
        ResourceService.key = function (branch, path) {
            return branch + "/" + path;
        };
        ResourceService.prototype.has = function (branch, path) {
            return this.resources.hasOwnProperty(ResourceService.key(branch, path));
        };
        ResourceService.prototype.rem = function (branch, path) {
            delete this.resources[ResourceService.key(branch, path)];
        };
        ResourceService.prototype.link = function (branch, path) {
            return this.resources[ResourceService.key(branch, path)];
        };
        ResourceService.prototype.load = function (branch, type, label, route, path, force) {
            var key = ResourceService.key(branch, path);
            var date = new Date();
            var promise = this.cacheService.get(route, path, force);
            return promise.then(function (data) {
                if (this.verbosity > 0) {
                    console.log("Resource Service: (" + ((new Date().getMilliseconds() - date.getMilliseconds()) / 1000.0) + "s) Loaded " + key);
                }
                if (!this.resources.hasOwnProperty(key)) {
                    this.resources[key] = new ResourceDefinition(date, branch, type, label, route, path, data);
                }
                else {
                    if (force) {
                        this.resources[key].data = data;
                        this.resources[key].journal.add(AppServices.JournalEntryType.Refreshed, true, date);
                        this.resources[key].modifed = false;
                    }
                }
                return this.resources[key];
            }, function (reason) {
                if (this.resources.hasOwnProperty(key)) {
                    this.resources[key].journal.add(AppServices.JournalEntryType.Error, false, date, { reason: reason });
                }
                return null;
            });
        };
        ResourceService.prototype.many = function (requests) {
            if (requests && requests.length) {
                var promises = [];
                for (var d = 0; d < requests.length; d++) {
                    var r = requests[d];
                    promises.push(this.load(r.branch, r.type, r.label, r.route, r.path, r.force));
                }
                return this.$q.all(promises);
            }
        };
        ResourceService.prototype.reload = function (resource) {
            return this.load(resource.branch, resource.type, resource.label, resource.route, resource.path, true);
        };
        ResourceService.$inject = ["$q", AppString.CacheService];
        return ResourceService;
    })();
    AppServices.ResourceService = ResourceService;
})(AppServices || (AppServices = {}));
var AppServices;
(function (AppServices) {
    "use strict";
    (function (JournalEntryType) {
        JournalEntryType[JournalEntryType["Accessed"] = 0] = "Accessed";
        JournalEntryType[JournalEntryType["Loaded"] = 1] = "Loaded";
        JournalEntryType[JournalEntryType["Error"] = 2] = "Error";
        JournalEntryType[JournalEntryType["Moved"] = 3] = "Moved";
        JournalEntryType[JournalEntryType["Saved"] = 4] = "Saved";
        JournalEntryType[JournalEntryType["Modified"] = 5] = "Modified";
        JournalEntryType[JournalEntryType["Refreshed"] = 6] = "Refreshed";
        JournalEntryType[JournalEntryType["Synchronized"] = 7] = "Synchronized";
    })(AppServices.JournalEntryType || (AppServices.JournalEntryType = {}));
    var JournalEntryType = AppServices.JournalEntryType;
    var Journal = (function () {
        function Journal() {
            this.entries = [];
        }
        Journal.prototype.add = function (entryType, status, date, info) {
            this.entries.unshift({
                type: JournalEntryType[entryType],
                status: status,
                elapsed: ((new Date().getMilliseconds() - date.getMilliseconds()) / 1000.0),
                date: date,
                info: info
            });
        };
        Journal.prototype.get = function (entryType) {
            for (var j = 0; j < this.entries.length; j++) {
                if (this.entries[j].type === JournalEntryType[entryType])
                    return this.entries[j];
            }
        };
        return Journal;
    })();
    AppServices.Journal = Journal;
})(AppServices || (AppServices = {}));
var AppServices;
(function (AppServices) {
    "use strict";
    var UserService = (function () {
        function UserService($resource, $q) {
            this.$resource = $resource;
            this.$q = $q;
            var userInfoPath = AppModule.LoaderSettings.endpoint.joinPath(UserService.stub);
            this.userResource = this.$resource(userInfoPath, null, {
                setGroups: { method: "POST", params: { action: "GetUser" } },
                get: { method: "GET", cache: true, isArray: false, params: { action: "GetUser" } },
            });
            this.userResource.get();
        }
        UserService.prototype.isMemberOf = function (user, group, actual) {
            if (!actual)
                return (user.GroupsEffective.indexOf(group) >= 0);
            else
                return (user.GroupsActual.indexOf(group) >= 0);
        };
        UserService.stub = "app/user";
        UserService.$inject = ["$resource"];
        return UserService;
    })();
    AppServices.UserService = UserService;
})(AppServices || (AppServices = {}));
if (!Array.prototype['find']) {
    Array.prototype['find'] = function (predicate) {
        if (this == null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;
        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}
if (typeof Array.prototype.tack === 'function') {
    console.error("NOTE: IF USING BROWSER SYNC, YOU MAY HAVE TROUBLE RELOADING PROTOTYPES DYNAMICALLY");
    throw "prototype conflict";
}
else {
    Array.prototype.tack = function (array) {
        for (var i = 0; i < array.length; i++) {
            this.push(array[i]);
        }
    };
}
if (typeof Array.prototype.append === 'function') {
    throw "prototype conflict";
}
else {
    Array.prototype.append = function (array) {
        this.push.apply(this, array);
    };
}
if (typeof Array.prototype.insertAt === 'function') {
    throw "prototype conflict";
}
else {
    Array.prototype.insertAt = function (index, item) {
        this.splice(index, 0, item);
    };
}
if (typeof Array.prototype.insertAtUniqueByProp === 'function') {
    throw "prototype conflict";
}
else {
    Array.prototype.insertAtUniqueByProp = function (index, item, prop) {
        for (var i = 0; i < this.length; i++) {
            if (this[i][prop] === item[prop])
                return false;
        }
        this.splice(index, 0, item);
    };
}
if (typeof Array.prototype.pushUnique === 'function') {
    throw "prototype conflict";
}
else {
    Array.prototype.pushUnique = function (item) {
        if (this.indexOf(item) == -1) {
            this.push(item);
            return true;
        }
        return false;
    };
}
if (typeof Array.prototype.mergeUnique === 'function') {
    throw "prototype conflict";
}
else {
    Array.prototype.mergeUnique = function (source) {
        for (var v = 0; v < source.length; v++) {
            if (this.indexOf(source[v]) === -1) {
                this.push(source[v]);
            }
        }
    };
}
if (typeof Array.prototype.sortByProp === 'function') {
    throw "prototype conflict";
}
else {
    Array.prototype.sortByProp = function (p) {
        return this.sort(function (a, b) {
            return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
        });
    };
}
if (typeof Array.prototype.alphanumSort === 'function') {
    throw "prototype conflict";
}
else {
    Array.prototype.alphanumSort = function (caseInsensitive) {
        for (var z = 0, t; t = this[z]; z++) {
            this[z] = [];
            var x = 0, y = -1, n = false, i, j;
            while (i = (j = t.charAt(x++)).charCodeAt(0)) {
                var m = (i == 46 || (i >= 48 && i <= 57));
                if (m !== n) {
                    this[z][++y] = "";
                    n = m;
                }
                this[z][y] += j;
            }
        }
        this.sort(function (a, b) {
            for (var x = 0, aa, bb; (aa = a[x]) && (bb = b[x]); x++) {
                if (caseInsensitive) {
                    aa = aa.toLowerCase();
                    bb = bb.toLowerCase();
                }
                if (aa !== bb) {
                    var c = Number(aa), d = Number(bb);
                    if (c == aa && d == bb) {
                        return c - d;
                    }
                    else
                        return (aa > bb) ? 1 : -1;
                }
            }
            return a.length - b.length;
        });
        for (var z = 0; z < this.length; z++)
            this[z] = this[z].join("");
    };
}
if (typeof Array.prototype.toCsvList === 'function') {
    throw "prototype conflict";
}
else {
    Array.prototype.toCsvList = function () {
        return this.join(', ');
    };
}
if (typeof Array.prototype.toHtmlList === 'function') {
    throw "prototype conflict";
}
else {
    Array.prototype.toHtmlList = function () {
        return '<ul><li>' + this.join('</li><li>') + '</li></ul>';
    };
}
var Common;
(function (Common) {
    "use strict";
    var EnumClass = (function () {
        function EnumClass(Class) {
            this.Class = Class;
            this.AllKeys = [];
            this.KeysByProperty = {};
            this.KeysByValue = {};
            var allValues = [];
            for (var key in Class) {
                if (Class.hasOwnProperty(key)) {
                    if (allValues.indexOf(Class[key]) != -1)
                        throw ("ClassEnum: Duplicate value detected in provided class type: \n" + Class.toString());
                    this.KeysByProperty[key] = key;
                    this.KeysByValue[Class[key]] = key;
                    this.AllKeys.push(this.KeysByProperty[key]);
                    allValues.push(Class[key]);
                }
            }
        }
        EnumClass.prototype.forEach = function (callback, scope) {
            for (var i = 0, l = this.AllKeys.length; i < l; i++) {
                callback.call(scope, this.Class[this.AllKeys[i]], this.AllKeys[i], this.Class);
            }
        };
        return EnumClass;
    })();
    Common.EnumClass = EnumClass;
})(Common || (Common = {}));
var Persistence;
(function (Persistence) {
    var LocalStore = (function () {
        function LocalStore() {
        }
        LocalStore.setItem = function (key, value) {
            this.backup[key] = value;
            if (this.ls) {
                this.ls.setItem(key, value);
            }
            return value;
        };
        LocalStore.getItem = function (key) {
            var value = this.backup[key];
            if (this.ls) {
                value = this.ls.getItem('paneLaunchWidth');
            }
            return value;
        };
        LocalStore.ls = localStorage;
        LocalStore.backup = {};
        return LocalStore;
    })();
    Persistence.LocalStore = LocalStore;
})(Persistence || (Persistence = {}));
if (typeof String.format === 'function') {
    throw "name conflict";
}
else {
    String.format = function () {
        var s = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i + 1]);
        }
        return s;
    };
}
if (typeof String.prototype.HashFnv32u === 'function') {
    throw "prototype conflict";
}
else {
    String.prototype.HashFnv32u = function (asHex) {
        var hval = 0x811c9dc5;
        for (var i = 0; i < this.length; i++) {
            hval = hval ^ (this.charCodeAt(i) & 0xFF);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }
        if (asHex)
            return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
        return hval >>> 0;
    };
}
if (typeof String.prototype.atozOnly === 'function') {
    throw "prototype conflict";
}
else {
    String.prototype.atozOnly = function () {
        return this.search(/[^a-zA-Z]+/) === -1;
    };
}
if (typeof String.prototype.atozPlusNumAndPeriodOnly === 'function') {
    throw "prototype conflict";
}
else {
    String.prototype.atozPlusNumAndPeriodOnly = function () {
        return this.search(/[^a-zA-Z0-9.]+/) === -1;
    };
}
if (typeof String.prototype.lpad === 'function') {
    throw "prototype conflict";
}
else {
    String.prototype.lpad = function (char, length) {
        var str = this;
        while (str.length < length)
            str = char + str;
        return str;
    };
}
if (typeof String.prototype.gpad === 'function') {
    throw "prototype conflict";
}
else {
    String.prototype.gpad = function (char, length) {
        var str = '';
        while (str.length < (length - this.length))
            str = char + str;
        return str;
    };
}
if (typeof String.prototype.idEquals === 'function') {
    throw "prototype conflict";
}
else {
    String.prototype.idEquals = function (str) {
        if (this.toLowerCase() === str.toLowerCase())
            return true;
        return false;
    };
}
if (typeof String.prototype.lastPathSegment === 'function') {
    throw "prototype conflict";
}
else {
    String.prototype.lastPathSegment = function () {
        return /[^/]*$/.exec(this)[0];
    };
}
if (typeof String.prototype.convPath === 'function') {
    throw "prototype conflict";
}
else {
    String.prototype.convPath = function () {
        return this.replace("/", "_");
    };
}
if (typeof String.prototype.joinPath === 'function') {
    throw "prototype conflict";
}
else {
    String.prototype.joinPath = function (end) {
        var beg = this.replace("/*", "");
        if (!end)
            return beg;
        if ((typeof end !== 'string') && (typeof end !== 'number'))
            throw new Error("String.prototype.joinPath: Expected a string or number and got " + typeof end);
        if (typeof end === 'number') {
            return beg + "/" + end;
        }
        if (beg.endsWith("/") || end.startsWith("/"))
            return beg + end;
        return beg + "/" + end;
    };
}
if (typeof String.prototype.breakOnPaths === 'function') {
    throw "prototype conflict";
}
else {
    String.prototype.breakOnPaths = function () {
        var shyguys = this.split("/");
        return shyguys.join("/&shy;");
    };
}
if (typeof String.prototype.splitPaths === 'function') {
    throw "prototype conflict";
}
else {
    String.prototype.splitPaths = function (maxLength) {
        if (!maxLength)
            maxLength = 50;
        var shyWords = this.split(' ');
        var shyFixed = [];
        var halfLength = Math.floor(maxLength / 2);
        var quarLength = Math.floor(maxLength / 4);
        for (var i = 0; i < shyWords.length; i++) {
            var word = shyWords[i];
            var pathFixed = [];
            var paths = word.split("/");
            for (var p = 0; p < paths.length; p++) {
                var path = paths[p];
                if (path.length > maxLength) {
                    var front = path.substr(0, quarLength);
                    var back = path.substr(path.length - (quarLength * 3));
                    path = front + ".." + back;
                }
                pathFixed.push(path);
            }
            shyFixed.push(pathFixed.join("/&shy;"));
        }
        return shyFixed.join(' ');
    };
}
var Utility;
(function (Utility) {
    var Timing = (function () {
        function Timing() {
            this.today = Date.now();
            this.msPerDay = (1000 * 60 * 60 * 24);
            this.msPerWeek = this.msPerDay * 7;
            this.oneWeekAgo = this.today - (this.msPerWeek * 1);
            this.twoWeekAgo = this.today - (this.msPerWeek * 2);
        }
        return Timing;
    })();
    Utility.Timing = Timing;
    function guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    Utility.guidGenerator = guidGenerator;
    function isFunction(fn) {
        return Object.prototype.toString.call(fn) === "[object Function]";
    }
    Utility.isFunction = isFunction;
    function functionAlreadyExists(func) {
        if (isFunction(func)) {
            var errorStack, errorLines;
            try {
                var err = new Error;
                errorStack = err.stack;
                errorLines = errorStack.split("\n")[2].trim();
            }
            catch (e) { }
            console.log("%c WARNING: Attempt to add Function that already exists ", "background-color:yellow;", errorLines);
            return true;
        }
        return false;
    }
    Utility.functionAlreadyExists = functionAlreadyExists;
    function isNullOrEmpty(data) {
        if (typeof data == 'number' || typeof data == 'boolean') {
            return false;
        }
        if (typeof data == 'undefined' || data === null) {
            return true;
        }
        if (typeof data.length != 'undefined') {
            return (data.length == 0);
        }
        var count = 0;
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                count++;
            }
        }
        return (count == 0);
    }
    Utility.isNullOrEmpty = isNullOrEmpty;
    function isNullOrWhiteSpace(data) {
        if (typeof data == 'number' || typeof data == 'boolean') {
            return false;
        }
        if (typeof data == 'undefined' || data === null) {
            return true;
        }
        if (typeof data.length != 'undefined') {
            if (/^[s]*$/.test(data.toString())) {
                return true;
            }
            return (data.length == 0);
        }
        var count = 0;
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                count++;
            }
        }
        return (count == 0);
    }
    Utility.isNullOrWhiteSpace = isNullOrWhiteSpace;
    function isValidByLength(str, length) {
        if (!(typeof str === "string" || str instanceof String))
            return false;
        if (Utility.isNullOrWhiteSpace(str) || (str.length < length))
            return false;
        return true;
    }
    Utility.isValidByLength = isValidByLength;
    function copyPrimitiveValues(src, dest) {
        var keys = Object.keys(src);
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            var srcType = typeof (src[keys[i]]);
            if (src[keys[i]] instanceof String)
                dest[keys[i]] = src[keys[i]].toString();
            else if (srcType == "string" || srcType == "number" || srcType == "boolean" || srcType == "undefined")
                dest[keys[i]] = src[keys[i]];
            else if (src[keys[i]] === null)
                dest[keys[i]] = src[keys[i]];
        }
    }
    Utility.copyPrimitiveValues = copyPrimitiveValues;
    function createValueCopy(val) {
        var dup;
        if (val === null)
            return null;
        var valType = typeof (val);
        if (val instanceof String)
            return val.toString();
        else if (valType == "string" || valType == "number" || valType == "boolean" || valType == "undefined")
            return (dup = val);
        else if (valType === 'object')
            return val;
        else if (valType === "function")
            return val;
        else
            return val;
    }
    Utility.createValueCopy = createValueCopy;
    function createShallowCopy(obj) {
        if (typeof (obj) !== "object")
            return Utility.createValueCopy(obj);
        var keys = Object.keys(obj);
        var len = keys.length;
        var clone = {};
        for (var i = 0; i < len; i++) {
            clone[keys[i]] = Utility.createValueCopy(obj[keys[i]]);
        }
        return clone;
    }
    Utility.createShallowCopy = createShallowCopy;
    function createRecursiveCopy(obj) {
        if (typeof (obj) === "string" || typeof (obj) === "number" || typeof (obj) === "function")
            return obj;
        if (typeof (obj) === "function")
            return new Function(obj.toString());
        if (obj.constructor.toString().indexof("Array") != -1) {
            var new_arr = new Array();
            for (var i = 0; i < obj.length; i++)
                new_arr[i] = createRecursiveCopy(obj[i]);
            return new_arr;
        }
        var new_obj = new Object();
        for (var k in obj)
            new_obj[k] = createRecursiveCopy(obj[k]);
        return new_obj;
    }
    Utility.createRecursiveCopy = createRecursiveCopy;
    function getUrlParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    Utility.getUrlParameterByName = getUrlParameterByName;
})(Utility || (Utility = {}));
