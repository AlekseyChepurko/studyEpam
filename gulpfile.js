/**
 * Created by Алексей on 18.03.2017.
 */

'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    reanme = require('gulp-rename'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssnano'),
    browserSync = require("browser-sync"),
    clean = require("gulp-clean"),
    reload = browserSync.reload;


var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        style: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        template: 'src/template/**/*.jade',
        js: 'src/scripts/main.js',
        style: 'src/styles/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/template/**/*.jade',
        js: 'src/scripts/**/*.js',
        style: 'src/styles/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "epam"
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('styles', function () {
    return gulp
        .src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(path.build.style))
});

gulp.task('watch', function() {
    return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
        .watch(path.watch.style, ['styles'])
        // When there is a change,
        // log a message in the console
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('clean', function() {
    return gulp.src(path.clean)
        .pipe(clean());
});

gulp.task("build",['styles']);

gulp.task('default', ['clean' ], function(){
    gulp.run(['build', 'watch']);
});