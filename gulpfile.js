'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    browser = require('browser-sync').create(),
    uglify  = require ( 'gulp-uglify' ),
    img = require('gulp-image'),
    pug = require('gulp-pug');

sass.compiler = require('node-sass');

// compilate sass
gulp.task('sass', () => {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
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
gulp.task('script',  ()=> {
    return gulp.src(['app/js/main.js'])
        .pipe(concat('build.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});


//img compressed

gulp.task('img',  ()=> {
    gulp.src('app/img/**/*')
        .pipe(img(
            {
                pngquant: true,
                optipng: false,
                zopflipng: true,
                jpegRecompress: true,
                mozjpeg: false,
                guetzli: false,
                gifsicle: true,
                svgo: true,
                concurrent: 10,
                quiet: true // defaults to false
            }
        ))
        .pipe(gulp.dest('app/img/'));
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
