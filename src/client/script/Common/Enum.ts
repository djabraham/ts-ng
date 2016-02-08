
//
// Common

module Common {
    "use strict";

    export interface HyperString {
        name: string;
    }

    /** Wraps a class with a type that can be used like an enum.
        Provided class should be a defined with unique static properties defined. */
    export class EnumClass<T> {
        public AllKeys: string[] = [];

        /** Need to cast return values to <any> when property is not a string  */
        public KeysByProperty: T = <T>{};
        public KeysByValue = {};

        constructor(public Class: T) {
            var allValues = [];         // For collision detection

            for (var key in Class) {
                if (Class.hasOwnProperty(key)) {

                    // Checks for duplicate values initially, then consumers should refrain from changing values
                    if (allValues.indexOf(Class[key]) != -1)
                        throw ("ClassEnum: Duplicate value detected in provided class type: \n" + Class.toString());

                    this.KeysByProperty[key] = key;
                    this.KeysByValue[Class[key]] = key;
                    this.AllKeys.push(this.KeysByProperty[key]);
                    allValues.push(Class[key]);
                }
            }
        }

        /** For iterating over the enum; gets each value, key, and full type instance.

            Note that TypeScript doesn't yet have a means of asserting the type of scope
            (this) that is active on callback, which is tough one they are workign on.
            Just set the following before calling forEach, and use self's type info for now:
            var self = this;  */
        public forEach<T>(callback: (value?: any, key?: string, values?: T) => any, scope?: T) {
            for (var i = 0, l = this.AllKeys.length; i < l; i++) {
                callback.call(scope, this.Class[this.AllKeys[i]], this.AllKeys[i], this.Class);
            }
        }
    }
}
