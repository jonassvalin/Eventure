"use strict";

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import htmlreplace from "gulp-html-replace";

gulp.task('default', ['copy', 'browserify', 'html-replace']);

gulp.task('copy', function () {
  return gulp.src(['src/public/**/*', 'src/server/**/*', 'src/client/views/pages/**/*', 'src/client/views/partials/**/*'], {
      base: 'src'
    })
    .pipe(gulp.dest('dist'));
});

gulp.task('browserify', function () {
  return browserify('src/client/index.js')
    .transform('babelify')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/client'));
});

gulp.task('html-replace', function() {
  return gulp.src('src/client/views/index.html')
    .pipe(htmlreplace({'js': './../bundle.js'}))
    .pipe(gulp.dest('dist/client/views/'));
});
