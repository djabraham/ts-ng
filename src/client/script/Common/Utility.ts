
//
// Utility methods

module Utility {

    interface Error {
        stack?: string;
    }

    export class Timing {
        today: number = Date.now();
        msPerDay: number = (1000 * 60 * 60 * 24);
        msPerWeek: number = this.msPerDay * 7;
        oneWeekAgo: number = this.today - (this.msPerWeek * 1);
        twoWeekAgo: number = this.today - (this.msPerWeek * 2);
    }

    // probably sloooow, use sparingly
    export function guidGenerator () {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    export function isFunction(fn) {
        return Object.prototype.toString.call(fn) === "[object Function]";
    }

    export function functionAlreadyExists(func) {
        if (isFunction(func)) {      //  (typeof func === 'function') {  alternate
            var errorStack, errorLines;

            try {
                var err: Error = new Error;
                errorStack = err.stack;
                errorLines = errorStack.split("\n")[2].trim();
            }
            catch (e) { }

            console.log("%c WARNING: Attempt to add Function that already exists ",
                "background-color:yellow;", errorLines);

            return true;
        }
        return false;
    }

    export function isNullOrEmpty (data) {
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

    export function isNullOrWhiteSpace (data) {
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

    export function isValidByLength (str, length) {
        if (!(typeof str === "string" || str instanceof String))
            return false;

        if (Utility.isNullOrWhiteSpace(str) || (str.length < length))
            return false;

        return true;
    }

    export function copyPrimitiveValues (src, dest) {
        var keys = Object.keys(src);
        var len = keys.length;

        for (var i = 0; i < len; i++) {
            var srcType = typeof (src[keys[i]]);

            if (src[keys[i]] instanceof String)
                dest[keys[i]] = src[keys[i]].toString();        // boxed string
            else if (srcType == "string" || srcType == "number" || srcType == "boolean" || srcType == "undefined")
                dest[keys[i]] = src[keys[i]];                   // primitive types
            else if (src[keys[i]] === null)
                dest[keys[i]] = src[keys[i]];                   // nulls
        }
    }

    // should copy all primitives or return orig otherwise
    export function createValueCopy(val) {
        var dup;

        if (val === null)
            return null;

        var valType = typeof (val);

        if (val instanceof String)
            return val.toString();      // have to check for boxed string, because its an object
        else if (valType == "string" || valType == "number" || valType == "boolean" || valType == "undefined")
            return (dup = val);         // dup is created by = in case of primitives
        else if (valType === 'object')
            return val;                 // doesn't copy ref types, just returns them
        else if (valType === "function")
            return val;                 // avoid unecessary closures ?
        else
            return val;                 // dom types, etc..

    }

    // copies an object copy of immediate property values
    //   added this because angular.extend() was not copying string values (%^$%^!)
    //   in cases where object properties are simple, angular.equals() should work on results
    export function createShallowCopy (obj) {
        if (typeof (obj) !== "object")
            return Utility.createValueCopy(obj);

        var keys = Object.keys(obj);
        var len = keys.length;
        var clone = {};

        for (var i = 0; i < len; i++) {
            // probably cant ignore keys beginning with $ or _ if angular.equals() test is used
            // if ((keys[i][0] == '$') || (keys[i][0] == '_')) continue;
            clone[keys[i]] = Utility.createValueCopy(obj[keys[i]]);
        }

        return clone;
    }

    // TODO haven't tested this yet, haven't needed it yet
    export function createRecursiveCopy (obj) {

        if (typeof (obj) === "string" || typeof (obj) === "number" || typeof (obj) === "function") return obj;
        if (typeof (obj) === "function") return new Function(obj.toString());

        if (obj.constructor.toString().indexof("Array") != -1) {
            var new_arr = new Array();
            for (var i = 0; i < obj.length; i++) new_arr[i] = createRecursiveCopy(obj[i]);
            return new_arr;
        }

        var new_obj = new Object();
        for (var k in obj) new_obj[k] = createRecursiveCopy(obj[k]);
        return new_obj;
    }

    // obtains query string parameters
    export function getUrlParameterByName(name) { 
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

}

