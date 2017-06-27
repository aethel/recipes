var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    // path = require('path'),
    watch = require('gulp-watch'),
    concatCss = require('gulp-concat-css'),
    concat = require('gulp-concat');
    // uglifycss = require('gulp-uglifycss');



gulp.task('jsconcat', ()=>{
  return gulp.src('app/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(concat('scripts.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/scripts'))
});


gulp.task('less', function() {
    return gulp.src('app/styles/**/*.less')
        .pipe(less().on('error', function(e) {
            console.log(e)
        }))
        .pipe(concatCss('bundle.css'))
        .pipe(gulp.dest('app/styles/css'));
});

gulp.task('copySource', function() {
    gulp.src(['app/**/*'])
        .pipe(gulp.dest('dist/'))
})

// gulp.task('copyStyles', function() {
//     gulp.src(['app/styles/css/*.css'])
//         .pipe(uglifycss({
//           "maxLineLen": 80,
//           "uglyComments": true
//         }))
//         .pipe(gulp.dest('dist/styles/css/'))
// })

// gulp.task('copyFiles', function() {
//     gulp.src('./app/**/*.html')
//         .pipe(gulp.dest('./dist/'))
// });

gulp.task('watch', function() {
    gulp.watch('app/styles/**/*.less', ['less']);
});

//
gulp.task('distDeploy', ['copySource'], function() {});
