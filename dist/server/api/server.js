var path = require("path");
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); // this module doesn't use the ES6 default export yet
var index_1 = require('./routes/index');
var users_1 = require('./routes/users');
var search_1 = require('./routes/search');
var metadata_1 = require('./routes/metadata');
var config = require("../../../config/default.json");
// get an instance of router
var router = express.Router();
var app = express();
/** filtered json keys (due to recursion/self-refer) */
var ignoreJsonKeys = ["typeInternals"];
app.set('json replacer', function (key, value) {
    if (ignoreJsonKeys.indexOf(key) > -1)
        return undefined;
    return value;
});
// view engine setup
//app.set('views', join(__dirname, 'views'));
//app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var typedInfo = {
    fullpath: {
        data: path.join(__dirname, config.path)
    }
};
try {
}
catch (e) {
    throw ("Error processing config infomation in (config.json): " + e.message);
}
// set rootPath
app.use(function (req, res, next) {
    // stashing typedInfo on request
    req["typedInfo"] = typedInfo;
    next();
});
app.use('/api/users', users_1.default);
app.use('/api/search', search_1.default);
app.use('/api/metadata', metadata_1.default);
app.use('/api/', index_1.default);
app.use(express.static(path.join(__dirname, '../../client')));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Cannot Find: " + req.path);
    err['status'] = 404;
    next(err);
});
if (false) {
    // development error handler
    // will print stacktrace
    app.use(function (error, req, res, next) {
        console.log(error.message);
        res.status(error['status'] || 500);
        res.render('error', {
            message: error.message,
            error: error
        });
    });
}
else {
    // production error handler
    // no stacktraces leaked to user
    app.use(function (error, req, res, next) {
        res.status(error['status'] || 500);
        res.json({ err: error.message });
        console.log(error.message);
        return null;
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
