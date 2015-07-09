var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('default', function() {
  return gulp.src([
    'bower_components/**',
    'data/**',
    'icons/**',
    'js/**',
    'style/**',
    'index.html',
    'manifest.webapp',
    'LICENSE'], { base: '.' })
    .pipe(zip('package.zip'))
    .pipe(gulp.dest('./'));
});
