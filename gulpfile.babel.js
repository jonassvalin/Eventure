"use strict";

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import htmlreplace from "gulp-html-replace";

gulp.task('default', ['copy'], function () {
  return browserify('src/client/index.js')
    .transform('babelify')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/client'));
});

gulp.task('copy', function () {
  return gulp.src(['src/public/**/*', 'src/server/**/*', 'src/client/views/**/*'], {
      base: 'src'
    })
    .pipe(gulp.dest('dist'));
});
