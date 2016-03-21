const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const Server = require('karma').Server;
const cssnano = require('gulp-cssnano');
const runSequence = require('run-sequence');
const karmaConfig = require('./karmaConfig');
const Config = require('karma/lib/config').Config;

const paths = {
  test: __dirname + '/test/**/*.js',
  js: __dirname + '/src/js/**/*.js',
  jsEntry: __dirname + '/src/js/Drift.js',
  css: __dirname + '/src/css/**/*.css'
};

function runKarmaTests(configObj, done, singleRun) {
  var config = new Config();
  config.set(configObj);

  if (singleRun !== null) {
    config.singleRun = singleRun;
  }

  new Server(config, function(exitCode) {
    if (exitCode !== 0) {
      throw new gutil.PluginError({plugin: 'karma', message: 'Karma tests failed'});
    }

    done();
  }).start();
}

gulp.task('default', ['build', 'test-headless']);

gulp.task('build', ['build-js', 'build-css']);
// When actually setting up CI stuff, this will need to run in sequence.
// https://www.npmjs.com/package/run-sequence
gulp.task('build-ci', function() {
  runSequence(['build', 'test-headless']);
});

gulp.task('test-local', function(done) {
  runKarmaTests(karmaConfig.local, done, true);
});

gulp.task('test-headless', function(done) {
  runKarmaTests(karmaConfig.headless, done, true);
});

gulp.task('test-full', function(done) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    throw new gutil.PluginError({
      plugin: 'test-full',
      message: 'Unable to run full tests. Please make sure both SAUCE_USERNAME and SAUCE_ACCESS_KEY are defined in the environment.'
    });
  }

  runKarmaTests(karmaConfig.full, done, true);
});


gulp.task('build-js', function() {
  var b = browserify({
    standalone: 'Drift',
    entries: paths.jsEntry,
    transform: [babelify]
  }).bundle();

  return b.pipe(source('Drift.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-css', function() {
  return gulp.src(paths.css)
    .pipe(gulp.dest('dist'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
  gulp.watch([paths.js, paths.test], function() {
    runSequence(['build-js', 'test-headless']);
  });
  gulp.watch(paths.css, ['build-css']);
});
