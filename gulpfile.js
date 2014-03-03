var gulp = require('gulp')
var usemin = require('gulp-usemin')
var uglify = require('gulp-uglify')
var minifyHtml = require('gulp-minify-html')
var minifyCss = require('gulp-minify-css')
var rev = require('gulp-rev')

gulp.task('build', function() {
  gulp.src('./views/*.ejs')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()],
      assetsDir: 'public/'
    }))
    .pipe(gulp.dest('build/'))
})