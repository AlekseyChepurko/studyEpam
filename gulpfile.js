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
    cssnano = require('gulp-cssnano'),
    browserSync = require("browser-sync"),
    clean = require("gulp-clean"),
    notify = require("gulp-notify"),
    babelify = require("babelify"),
    browserify = require('browserify'),
    source = require("vinyl-source-stream"),
    buffer = require('vinyl-buffer'),
    reload = browserSync.reload;


var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        style: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        data: 'build/data/'
    },
    src: {
        template: 'src/templates/*.jade',
        js:{
            index: 'src/scripts/main.js',
            odm: 'src/scripts/odm.js'
        } ,
        style: 'src/styles/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        data: 'src/testData/**/*.*'
    },
    watch: {
        html: 'src/templates/**/*.jade',
        js: 'src/scripts/**/*.js',
        style: 'src/styles/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts.scss/**/*.*'
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
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.style))
});

gulp.task('images', function() {
    return gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest(path.build.img));
});

gulp.task('fonts', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('testData', function() {
    return gulp.src(path.src.data)
        .pipe(gulp.dest(path.build.data));
});

// gulp.task('scripts', function(watch) {
//     gulp.src(path.src.js)
//         .pipe(browserify({
//             insertGlobals : true,
//             debug : !gulp.env.production
//         }).transform(babelify.configure({
//             presets: ["es2015"]
//         })))
//         .pipe(concat('main.js'))
//         // .pipe(uglify())
//         .pipe(gulp.dest(path.build.js));
//
// });
gulp.task("mainScript", function(){
    return browserify({
        entries: [path.src.js.index]
    })
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .bundle()
        .pipe(source("main.js"))
        // TODO find out what the problem is
        // .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        ;
});
gulp.task("odmScript", function(){
    return browserify({
        entries: [path.src.js.odm]
    })
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .bundle()
        .pipe(source("odm.js"))
        // TODO find out what the problem is
        // .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        ;
});

gulp.task('MapScript', function() {
    gulp.src('src/scripts/mapInit.js')
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('templates', function() {
    return gulp
        .src(path.src.template)
        .pipe(jade({ pretty: true }))
        .on('error', notify.onError(function(error) {
            console.log(123);
            return {
                title: 'Jade',
                message:  error.message
            }
        }))
        .pipe(gulp.dest(path.build.html));
});

gulp.task('watch', function() {
   gulp.watch(path.watch.style, ['styles'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch(path.watch.html, ['templates'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch(path.watch.js, ['mainScript'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch(path.watch.js, ['odmScript'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch('src/**/**/*.*').on('change', browserSync.reload);
});

gulp.task('clean', function() {
    return gulp.src(path.clean)
        .pipe(clean());
});

gulp.task('browser-sync', function() {
    return browserSync.init({
        server: {
            baseDir: path.build.html
        }
    });
});

gulp.task("build",['templates', 'styles', 'images','mainScript', 'odmScript', 'MapScript', 'testData' , 'fonts']);

gulp.task('default', ['clean' ], function(){
    gulp.run(['build', 'watch', 'browser-sync']);
});