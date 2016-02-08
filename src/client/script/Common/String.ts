
//
// String methods

interface StringConstructor {
    format: () => string;
}

interface String {
    HashFnv32u: (boolean) => number | string;
    atozOnly: () => boolean;
    atozPlusNumAndPeriodOnly: () => boolean;
    lpad: (char, length) => string;
    gpad: (char, length) => string;
    idEquals: (string) => boolean;
    lastPathSegment: () => string;
    convPath: () => string;
    joinPath: (string) => string;
    breakOnPaths: () => string;
    splitPaths: (number?) => string;
}

if (typeof String.format === 'function') {
    throw "name conflict";
} else {
    String.format = function (): string {
        var s = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i + 1]);
        }

        return s;
    }
}

//
// String extensions

// Generates a 32 bit FNV-1a hash, the results should match the equivalent C# version
if (typeof String.prototype.HashFnv32u === 'function') {
    throw "prototype conflict";
} else {
    String.prototype.HashFnv32u = function (asHex: boolean) : number | string {
        var hval = 0x811c9dc5;  // 2166136261

        // TODO: This damned this is too slow..native strings as keys were much faster

        // Strips unicode bits, only the lower 8 bits of the values are used
        for (var i = 0; i < this.length; i++) {
            hval = hval ^ (this.charCodeAt(i) & 0xFF);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }

        if (asHex)
            return ("0000000" + (hval >>> 0).toString(16)).substr(-8);

        return hval >>> 0;
    }
}

if (typeof String.prototype.atozOnly === 'function') {
    throw "prototype conflict";
} else {
    String.prototype.atozOnly = function () : boolean {
        return this.search(/[^a-zA-Z]+/) === -1;
    };
}

if (typeof String.prototype.atozPlusNumAndPeriodOnly === 'function') {
    throw "prototype conflict";
} else {
    String.prototype.atozPlusNumAndPeriodOnly = function () : boolean {
        return this.search(/[^a-zA-Z0-9.]+/) === -1;
    };
}

// pads a string with a provided char (must use toString() on numbers first)
if (typeof String.prototype.lpad === 'function') {
    throw "prototype conflict";
} else {
    String.prototype.lpad = function (char, length) : string {
        var str = this;
        while (str.length < length)
            str = char + str;
        return str;
    }
}

// returns the pad for a string with a provided char (must use toString() on numbers first)
if (typeof String.prototype.gpad === 'function') {
    throw "prototype conflict";
} else {
    String.prototype.gpad = function (char, length) : string {
        var str = '';
        while (str.length < (length - this.length))
            str = char + str;
        return str;
    }
}

// does a case insensitive comparison
if (typeof String.prototype.idEquals === 'function') {
    throw "prototype conflict";
} else {
    String.prototype.idEquals = function (str) : boolean {
        if (this.toLowerCase() === str.toLowerCase())
            return true;

        return false;
    }
}

if (typeof String.prototype.lastPathSegment === 'function') {
    throw "prototype conflict";
} else {
    String.prototype.lastPathSegment = function () : string {
        return /[^/]*$/.exec(this)[0];
    }
}

if (typeof String.prototype.convPath === 'function') {
    throw "prototype conflict";
} else {
    String.prototype.convPath = function () : string {
        return this.replace("/", "_");
    }
}

if (typeof String.prototype.joinPath === 'function') {
    throw "prototype conflict";
} else {
    String.prototype.joinPath = function (end) : string {
        // TODO: performance of this?
        var beg = this.replace("/*", "");

        if (!end) return beg;

        if ((typeof end !== 'string') && (typeof end !== 'number'))
            throw new Error("String.prototype.joinPath: Expected a string or number and got " + typeof end);

        if (typeof end === 'number') {
            return beg + "/" + end;
        }

        if (beg.endsWith("/") || end.startsWith("/"))
            return beg + end;

        return beg + "/" + end;
    }
}

// Adds shybreaks after paths
if (typeof String.prototype.breakOnPaths === 'function') {
    throw "prototype conflict";
} else {
    String.prototype.breakOnPaths = function () : string {
        var shyguys = this.split("/");
        return shyguys.join("/&shy;");
    };
}

// Adds shybreaks after paths and splits segments > 40 into xxx..xxx
if (typeof String.prototype.splitPaths === 'function') {
    throw "prototype conflict";
} else {
    String.prototype.splitPaths = function (maxLength : number) : string {
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

            // processes paths or otherwise just whole words
            for (var p = 0; p < paths.length; p++) {
                var path = paths[p];

                // breaks paths that are too long
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

