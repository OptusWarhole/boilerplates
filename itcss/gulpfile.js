/**
 * Description: Gulpfile.
 * Version: 1.0.0
 * Last update: 2016/11/14
 * Author: Virgile Gouala <vgouala@castelis.com>
 *
 *
 *  DEPENDENCIES
 *  Gulp.................Gulp's required dependencies
 *  SCSS / SASS / CSS....Style's required
 *  JavaScript...........JS' required dependencies
 *  Tools................Other required dependencies
 *
 *  DEPENDENCIES' OPTIONS
 *
 *  VARIABLES
 *
 *  TASKS
 *  Development..........Task for developper, use it in your staging
 *  Production...........Task created compile SASS and clean CSS
 *  Uglify...............Task that uglify the JS
 *  Watch................Big Brother is watching your SASS' changes
 *
 *  DEFAULT TASK

 */



// ==========================================================================
// DEPENDENCIES
// ==========================================================================

    //
    // Gulp
    // ==========================================================================
    var gulp = require('gulp');
    var $    = require('gulp-load-plugins')();

    //
    // SCSS / SASS / CSS
    // ==========================================================================
    var sass         = require('gulp-sass');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('gulp-autoprefixer');
    var cleanCSS     = require('gulp-clean-css');

    //
    // JavaScript
    // ==========================================================================
    var uglify = require('gulp-uglify');

    //
    // Tools
    // ==========================================================================
    const rename = require('gulp-rename');
    const size   = require('gulp-size');
    var connect  = require('gulp-connect');

// ==========================================================================
// DEPENDENCIES' OPTIONS
// ==========================================================================
    var autoprefixerOptions = {
      browsers: ['last 2 versions'],
      cascade : true
    };
    var sassPathsFoundation = [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
    ];
    var sassOptions = {
      errLogToConsole: true,
      outputStyle    : 'expanded',
      includePaths: sassPathsFoundation,
    };

// ==========================================================================
// VARIABLES
// ==========================================================================
   var inputCss  = './assets/css/scss/**/*.scss';
   var outputCss = './assets/css';
   var inputJs   = './assets/js/**/*.js';
   var outputJs  = './assets/js/';

// ==========================================================================
// TASKS
// ==========================================================================

    //
    // Dev
    // ==========================================================================
   gulp.task('sass', function () {
    return gulp
    .src(inputCss)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(size())
    .pipe(gulp.dest(outputCss))
    .pipe(connect.reload());
    });

    //
    // Clean
    // ==========================================================================
    gulp.task('clean', function () {
      return gulp
      .src(inputCss)
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(cleanCSS())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(outputCss));
      });

    //
    // Uglify
    // ==========================================================================
    gulp.task('uglify', function () {
      gulp.src(inputJs)
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(outputJs))
      });


    //
    // Connect (LiveReload)
    // ==========================================================================
    gulp.task('connect', function() {
      connect.server({
        livereload: true
        });
      });


    //
    // Watch
    // ==========================================================================
    gulp.task('watch', function() {
      return gulp
      .watch(inputCss, ['sass'])
      .on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
      });

// ==========================================================================
// DEFAULT TASK
// ==========================================================================
   gulp.task('default', ['watch', 'connect']);
   gulp.task('prod', ['clean']);