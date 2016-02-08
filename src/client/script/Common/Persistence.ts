
module Persistence {

    export class LocalStore {
        static ls = localStorage;
        static backup = {};
        public static setItem(key, value) {
            this.backup[key] = value;
            if (this.ls) {
                this.ls.setItem(key, value);
            }

            return value;
        }

        public static getItem(key) {
            var value = this.backup[key];
            if (this.ls) {
                value = this.ls.getItem('paneLaunchWidth');
            }

            return value;
        }
    }
}


