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
	const rename    = require('gulp-rename');
	const size      = require('gulp-size');
	var browserSync = require('browser-sync');

// ==========================================================================
// DEPENDENCIES' OPTIONS
// ==========================================================================
	var autoprefixerOptions = {
		browsers: ['last 2 versions'],
		cascade : true
	};
	var sassOptions = {
		errLogToConsole: true,
		outputStyle    : 'expanded',
	};

// ==========================================================================
// VARIABLES
// ==========================================================================
	var inputCss  = './themes/custom/frontier/assets/css/scss/**/*.scss';
	var outputCss = './themes/custom/frontier/assets/css';
	var inputJs   = './themes/custom/frontier/assets/js/**/*.js';
	var outputJs  = './themes/custom/frontier/assets/js/';
	var inputTwig = './themes/custom/frontier/**/*.twig';
// ==========================================================================
// TASKS
// ==========================================================================


	//
	// Browser Sync | Launch server
	// ==========================================================================
	gulp.task('browser-sync', ['sass'], function() {
		browserSync.init({
			proxy: "localhost/castelis/portfolio/en",
			socket: {
				domain: 'localhost:3000'
			}
		});
	});

	//
	// Browser Sync | Reload Page
	// ==========================================================================
	gulp.task('reload', function () {
		browserSync.reload();
	});


	//
	// Dev
	// ==========================================================================
	gulp.task('sass', function () {
		gulp.src('./themes/custom/frontier/assets/css/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./themes/custom/frontier/assets/css'))
		.pipe(browserSync.reload({stream:true}));
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
		.pipe(browserSync.reload({stream:true}));
	});


	//
	// Watch
	// ==========================================================================
	gulp.task('watch', function(){
		gulp.watch(inputCss, ['sass']);
		gulp.watch(inputJs,  ['uglify']);
		gulp.watch(inputTwig, ['reload']);
	});

	// ==========================================================================
	// DEFAULT TASK
	// ==========================================================================
	gulp.task('default', ['browser-sync', 'watch']);