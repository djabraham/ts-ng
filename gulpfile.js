'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var tslint = require('gulp-tslint');
var ts = require('gulp-typescript');
var browserSync = require('browser-sync');
var merge = require('merge2');

// Apollo UI features these
var pxtorem = require('gulp-pxtorem');
var autoprefixer = require('gulp-autoprefixer');

///////////////////////////////////////////
// Build Checks

var typePath = path.join(__dirname, 'typings');
var bowerPath = path.join(__dirname, 'dist/client/lib');

try {
  fs.statSync(typePath).isDirectory()
} catch(e) {
  console.warn('\x1b[32m');
  console.warn('  Please install tsd globally and then install typings, for example:\n');
  console.warn('    $ sudo npm install tsd -g');
  console.warn('    $ tsd install');
  console.warn('\x1b[0m');
}

try {
  fs.statSync(typePath).isDirectory()
} catch(e) {
  console.warn('\x1b[32m');
  console.warn('  Please install bower globally and then install typings, for example:\n');
  console.warn('    $ sudo npm install bower -g');
  console.warn('    $ bower install');
  console.warn('\x1b[0m');
}

//////////////////////////////////////////
// Optional TsLint

gulp.task('tslint', function(){
  return gulp.src([
    './src/**/*.ts',
    './src/**/*.tsx'
    ])
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});
gulp.task('tslint-watch', function() {
  gulp.watch([
    './source/**/*.ts',
    './source/**/*.tsx'
    ], ['tslint']);
});

///////////////////////////////////////////
// Server Side Transforms

// Server side ts is generated into seperate files, per the common node module style
gulp.task('build-server-source', function () {
  let tsProject = ts.createProject('./src/server/tsconfig.json');
  let tsResult = tsProject.src().pipe(ts(tsProject));
  return tsResult.js.pipe(gulp.dest('./dist/server'));
});

gulp.task('build-server', ['build-server-source'])

///////////////////////////////////////////
// Client Side Transforms

// Client side ts is merged into one js file (app.js), per the classic js style
gulp.task('build-client-source', function () {
  let tsProject = ts.createProject('./src/client/tsconfig.json', { outFile: 'app.js' });
  let tsResult = tsProject.src().pipe(ts(tsProject));
  return tsResult.js.pipe(gulp.dest('./dist/client/script'));
});

// Copies static resources into ./dist/client
gulp.task('build-client-static', function () {
  return gulp.src('./src/client/static/**/*.*')
    .pipe(gulp.dest('./dist/client'));
});

// This expands output atm
gulp.task('build-client-styles', function () {
  return gulp.src('./src/client/styles/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(pxtorem())
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(gulp.dest('./dist/client/css'));
});

gulp.task('build-client', [
  'build-client-static',
  'build-client-source',
  'build-client-styles'
])

gulp.task('build-all', [
    'build-client',
    'build-server'
    ], function() {
      console.log('\nFull Build Completed\n');
    }
);

// Watches for any TypeScript or Sass file changes, triggering a transpilation build into ./dist.
// Once changes are detected in ./dist, other gulp tasks will restart the client/server accordingly.
gulp.task('run-watch', function () {
  gulp.watch('./src/client/static/**/*.*', ['build-client-static']);
  gulp.watch('./src/client/styles/**/*.scss', ['build-client-styles']);
  gulp.watch('./src/client/script/**/*.ts', ['build-client-source']);
  gulp.watch('./src/server/api/**/*.ts', ['build-server-source']);
});

// NOTE: The server runs on 3080 and browser-sync proxys it over 3088.
// This is done so that the script can be wrapped and then dynamically reloaded.
gulp.task('run-browser-sync', ['build-all', 'run-watch', 'run-nodemon'], function () {
  browserSync.init({
    ui: false,
    port: 3088,
    reloadDelay: 2000,
    files: [
      './dist/client/script/app.js',
      './dist/client/script/lib.js',
      './dist/client/css/styles.css',
      './dist/client/index.html',
      './dist/client/views/*.ejs',
    ],
    browser: 'google chrome',
    proxy: 'http://localhost:3080',
    logPrefix: 'browserSync'
  });
});

// Run nodemon, to restart node whenever server changes are detected
// This will also restart the browser after a short delay, to sync up the client
gulp.task('run-nodemon', ['build-all', 'run-watch'], function (cb) {
  let started = false;

  return nodemon({
    injectChanges: false,
    script: './dist/server/api/www.js',
    watch: ['dist/server/api/**/*.js'],
    delay: 1000
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  })
  .on('restart', function onRestart() {
    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, 1000);  // browserSync reload delay
  });
});

// This informs gulp that certain dependent build tasks must be completed first
gulp.task('startup', ['build-all', 'run-watch'], function() {
  setImmediate(function(){
    // confirm this message appears before nodemon or browserSync
    console.log('\nPrerequisites Completed\n');
  });
});

// Run browser-sync, to restart browser when client changes are detected
// This starts by doing a full build and launch the server monitor and source watcher
gulp.task('default', ['build-all', 'run-watch', 'startup', 'run-browser-sync']);

