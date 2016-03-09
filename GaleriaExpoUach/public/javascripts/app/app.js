'use strict';

var gprApp = angular.module('galeriaApp', ['galeriaAppControllers']);

String.prototype.camelize = function() {
    return this.toLowerCase().replace(/\s+(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
};

Array.prototype.contains = function(obj, attr) {
    var i = this.length;
    while (i--) {
        if (attr) {
            if (this[i][attr] === obj[attr]) {
                return true;
            }
        } else {
            if (this[i] === obj) {
                return true;
            }
        }
    }
    return false;
};

Array.prototype.unique = function() {
    var a = this;
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0)
            p.push(c);
        return p;
    }, []);
};

Array.prototype.findByAttribute = function(object, attr) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][attr] === object[attr]) {
            return i;
        }
    }
    return -1;
};

Array.prototype.push = (function() {
    var original = Array.prototype.push;
    return function() {
        //Variable temporal como workaround de error de compilación
        //cuando se realiza un push, y se manda un objeto vacío como param.
        //arr.push({})
        var tempArguments = arguments;
        //Versión original; restaurar si ocurre algún problema
        //return original.apply(this, arguments);
        return original.apply(this, tempArguments);
    };
})();

Boolean.prototype.toggle = function() {
    if (this.valueOf())
        return false;
    else
        return true;
};

