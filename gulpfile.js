const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const flow = require('gulp-flowtype');
const eslint = require('gulp-eslint');

gulp.task('scripts', () => {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
});

gulp.task('flow', () => {
  return gulp.src('src/**/*.js')
    .pipe(flow({
      killFlow: false,
      declarations: './flow-typed'
    }));
});

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format('node_modules/eslint-codeframe-formatter'))
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['watch']);

gulp.task('watch', ['lint', 'flow', 'scripts'], () => {
  gulp.watch('src/**/*.js', ['lint', 'flow', 'scripts']);
});
