
//
// Array methods

interface Array<T> {
  find(predicate: (T) => boolean): T;
  append: (array: any[]) => void;
  tack: (array: any[]) => void;
  insertAt: (number, any) => void;
  insertAtUniqueByProp: (index: number, item: any, prop: string) => void;
  pushUnique: (any) => void;
  mergeUnique: (array: any[]) => void;
  sortByProp: (string) => number;
  alphanumSort: (caseInsensitive: boolean) => void;
  toCsvList: () => string;
  toHtmlList: () => string;
}


if (!Array.prototype['find']) {
  Array.prototype['find'] = function(predicate) {
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




//
// Array extensions

// http://davidwalsh.name/combining-js-arrays

if (typeof Array.prototype.tack === 'function') {
  console.error("NOTE: IF USING BROWSER SYNC, YOU MAY HAVE TROUBLE RELOADING PROTOTYPES DYNAMICALLY");
  throw "prototype conflict";
} else {
  Array.prototype.tack = function(array: any[]) {
    for (var i = 0; i < array.length; i++) { 
      this.push(array[i]);
    }
  }
}

if (typeof Array.prototype.append === 'function') {
  throw "prototype conflict";
} else {
  Array.prototype.append = function(array: any[]) {
    this.push.apply(this, array)
  }
}

if (typeof Array.prototype.insertAt === 'function') {
  throw "prototype conflict";
} else {
  Array.prototype.insertAt = function(index: number, item: any) {
    this.splice(index, 0, item);
  };
}

if (typeof Array.prototype.insertAtUniqueByProp === 'function') {
  throw "prototype conflict";
} else {
  Array.prototype.insertAtUniqueByProp = function(index: number, item: any, prop: string) {
    for (var i = 0; i < this.length; i++) {
      if (this[i][prop] === item[prop]) return false;
    }

    this.splice(index, 0, item);
  };
}

if (typeof Array.prototype.pushUnique === 'function') {
  throw "prototype conflict";
} else {
  Array.prototype.pushUnique = function(item: any) {
    if (this.indexOf(item) == -1) {                     // requires IE > 9 or JS 1.6 or greater
      // if(jQuery.inArray(item, this) == -1) {         // compatible version
      this.push(item);
      return true;
    }
    return false;
  }
}

if (typeof Array.prototype.mergeUnique === 'function') {
  throw "prototype conflict";
} else {
  Array.prototype.mergeUnique = function(source: any[]) {
    for (var v = 0; v < source.length; v++) {
      if (this.indexOf(source[v]) === -1) {
        this.push(source[v]);
      }
    }
  }
}

if (typeof Array.prototype.sortByProp === 'function') {
  throw "prototype conflict";
} else {
  Array.prototype.sortByProp = function(p: string): number {
    return this.sort(function(a, b) {
      return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
  }
}

if (typeof Array.prototype.alphanumSort === 'function') {
  throw "prototype conflict";
} else {
  Array.prototype.alphanumSort = function(caseInsensitive: boolean) {
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

    this.sort(function(a, b) {
      for (var x = 0, aa, bb; (aa = a[x]) && (bb = b[x]); x++) {
        if (caseInsensitive) {
          aa = aa.toLowerCase();
          bb = bb.toLowerCase();
        }
        if (aa !== bb) {
          var c = Number(aa), d = Number(bb);
          if (c == aa && d == bb) {
            return c - d;
          } else return (aa > bb) ? 1 : -1;
        }
      }
      return a.length - b.length;
    });

    for (var z = 0; z < this.length; z++)
      this[z] = this[z].join("");
  }
}

if (typeof Array.prototype.toCsvList === 'function') {
  throw "prototype conflict";
} else {
  Array.prototype.toCsvList = function() {
    return this.join(', ');
  }
}


if (typeof Array.prototype.toHtmlList === 'function') {
  throw "prototype conflict";
} else {
  Array.prototype.toHtmlList = function() {
    return '<ul><li>' + this.join('</li><li>') + '</li></ul>';
  }
}