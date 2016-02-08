var express_1 = require('express');
var index = express_1.Router();
/* GET /api */
index.get('/', function (req, res, next) {
    // hydrating typed info from request
    var typedInfo = req["typedInfo"];
    res.json({ title: 'TypeScript Client/Server Demo App', dataPath: typedInfo.fullpath.data });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = index;
