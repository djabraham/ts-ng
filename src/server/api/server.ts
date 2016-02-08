
import * as fs  from "fs";
import * as path from "path";

import * as express from 'express';
import * as bodyParser from 'body-parser';
import cookieParser = require('cookie-parser'); // this module doesn't use the ES6 default export yet

import index from './routes/index';
import users from './routes/users';
import search from './routes/search';
import metadata from './routes/metadata';

var config: IConfig = require("../../../config/default.json");

// get an instance of router
var router = express.Router();
const app: express.Express = express();

/** filtered json keys (due to recursion/self-refer) */
var ignoreJsonKeys = ["typeInternals"];
app.set('json replacer', function(key, value) {
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

var typedInfo: ITypedConfigInfo = {
    fullpath: {
        data: path.join(__dirname, config.path)
    }
}

try {
    // check for a file
    // let filePath = path.join(typedInfo.fullpath.data, typedInfo.fullpath.file);
    // if (!fs.accessSync(filePath, fs.F_OK))
    //   throw("File Not Found (config.json): " + filePath);

    // check for a folder
    // if (!fs.statSync(typedInfo.fullpath.data).isDirectory())
    //   throw("Path for Data Not Found (config.json): " + typedInfo.fullpath.data);
} catch (e) {
  throw("Error processing config infomation in (config.json): " + e.message);
}

// set rootPath
app.use(function(req, res, next) {
  // stashing typedInfo on request
  req["typedInfo"] = typedInfo;
  next();
});

app.use('/api/users', users);
app.use('/api/search', search);
app.use('/api/metadata', metadata);
app.use('/api/', index);
app.use(express.static(path.join(__dirname, '../../client')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Cannot Find: " + req.path);
  err['status'] = 404;
  next(err);
});

if (false) {  // (app.get('env') === 'development') {
  // development error handler
  // will print stacktrace
  app.use((error: any, req, res, next) => {
    console.log(error.message);
    res.status(error['status'] || 500);
    res.render('error', {
      message: error.message,
      error
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use((error: any, req, res, next) => {
    res.status(error['status'] || 500);
    res.json({ err: error.message });
    console.log(error.message);
    return null;
  });
}

export default app;