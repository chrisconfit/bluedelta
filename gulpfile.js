var gulp    = require('gulp');
var concat = require('gulp-concat');
var uglify  = require('gulp-uglify');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var ngHtml2Js = require("gulp-ng-html2js");
var compass = require('gulp-compass');
var gutil = require('gulp-util');

gulp.task('scripts', function() {
  gulp.src([
      '!./app_client/services/blue-delta-sdk/**/*',
    './app_client/services/blue-delta-sdk/API/Client/Button.js',
    './app_client/services/blue-delta-sdk/API/Client/ButtonsListResponse.js',
      './app_client/services/blue-delta-sdk/API/Client/Fabric.js',
      './app_client/services/blue-delta-sdk/API/Client/FabricsListResponse.js',
      './app_client/services/blue-delta-sdk/API/Client/Jean.js',
      './app_client/services/blue-delta-sdk/API/Client/Measurement.js',
      './app_client/services/blue-delta-sdk/API/Client/Order.js',
      './app_client/services/blue-delta-sdk/API/Client/OrderItem.js',
      './app_client/services/blue-delta-sdk/API/Client/OrdersListResponse.js',
      './app_client/services/blue-delta-sdk/API/Client/Thread.js',
      './app_client/services/blue-delta-sdk/API/Client/ThreadsListResponse.js',
      './app_client/services/blue-delta-sdk/API/Client/Transaction.js',
      './app_client/services/blue-delta-sdk/API/Client/User.js',
      './app_client/services/blue-delta-sdk/API/Client/UsersListResponse.js',
      './app_client/services/blue-delta-sdk/API/Client/DefaultApi.js',
    './app_client/**/*.js',
  	'!./app_client/**/*.test.js', 
  	'!./app_client/app.min.js'])
    .pipe(sourcemaps.init())
    .pipe(uglify({mangle: true}).on('error', gutil.log))
    .pipe(concat('./app.min.js'))  
    .pipe(gulp.dest('app_client'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app_client'));
});

gulp.task('styles', function() {
  return gulp.src(['./app_styles/**/*.scss'])
    .pipe(compass({
      css: './public/stylesheets',
      sass: './app_styles/'
    }))
    .pipe(gulp.dest('./public/stylesheets'))
})


gulp.task('watch', function() {
  watch(['./app_client/**/*.js', '!./app_client/**/*.test.js', '!./app_client/app.min.js'], function () {
    gulp.start('scripts');
  });
   watch(['./app_styles/*.scss', './app_styles/**/*.scss'], function () {
    gulp.start('styles');
  });
});

gulp.task('default', ['scripts', 'watch']);