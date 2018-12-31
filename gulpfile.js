'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    browser = require('browser-sync').create(),
    pug = require('gulp-pug');

sass.compiler = require('node-sass');

// compilate sass
gulp.task('sass', () => {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        .pipe(browser.stream());
});

//  compilate pug
gulp.task('pug', () => {
    return gulp.src('app/pug/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('app'));
});

// scripts
gulp.task('script', function () {
    return gulp.src(['app/js/main.js'])
        .pipe(concat('build.min.js'))
        .pipe(gulp.dest('app/js'));
});

//watching
gulp.task('sass:watch', () => {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
});
gulp.task('pug:watch', () => {
    gulp.watch('app/pug/**/*.pug', gulp.parallel('pug'));
});


//server
gulp.task('browser', function () {
    browser.init({
        server: {
            baseDir: "app"
        }
    });
    gulp.watch("app/**/*.html").on('change', browser.reload);
});


//default

gulp.task('default', gulp.parallel(
    'sass',
    'sass:watch',
    'pug',
    'pug:watch',
    'browser'
));
