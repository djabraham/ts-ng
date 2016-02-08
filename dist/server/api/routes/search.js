var express_1 = require('express');
var tasks_1 = require('./mock/tasks');
var search = express_1.Router();
function convertEnum(enumeration) {
    var output = {};
    for (var key in Object.keys(enumeration)) {
        output[key];
    }
}
// Example of shared types on server side
var noResults = tasks_1.Tasks.data.length;
search.get('/tasks', function (req, res, next) {
    res.send(tasks_1.Tasks);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;
