'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
 
sass.compiler = require('node-sass');

// sass compiler requires a single string location of files to compile, otherwise entering as two separate locations will result in separate file compilations
var main_sass = ['./scss/main.scss']
gulp.task('sass', function () {
  return gulp.src(main_sass)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('run', gulp.parallel('sass'));

gulp.task('watch', function(){
	gulp.watch('./scss/*.scss', gulp.parallel('sass'));
});

// compile only from main.scss
// watch only from './scss/**/*.scss'
