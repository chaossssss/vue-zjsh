var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function() {
  gulp.src('server/**/*.js')
    .pipe(babel({
      presets: ['es2015', 'stage-3']
    }))
    .pipe(gulp.dest('./build'))
});
gulp.task('html', function() {
  gulp.src('server/**/*.html')
    .pipe(gulp.dest('./build'))
});