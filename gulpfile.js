//install
// npm install --save-dev gulp gulp-concat-css gulp-minify-css gulp-rename gulp-notify gulp-autoprefixer gulp-livereload gulp-connect gulp-ruby-sass wiredep gulp-if gulp-uglify gulp-useref gulp-clean gulp-sourcemaps gulp-concat gulp-imagemin
//imagemin-pngquant
var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    clean = require('gulp-clean'),

    concatCss = require('gulp-concat-css');
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    notify = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin');


// server connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

//sass
gulp.task('sass', function() {
 // return gulp.src('sass/*.scss')
 // return gulp.src('stylesheets/*.css')
 return sass('app/sass/base.scss', { sourcemap: true })
    // .pipe(sass())
    // .pipe(concatCss("bundle.css"))
    .pipe(autoprefixer({ browsers: ['last 2 versions','> 1%', 'IE 7'], cascade: false }))
    // .pipe(minifyCss())
    // .pipe(rename("bundle.min.css"))
    .pipe(sourcemaps.write())
    .pipe(notify("Done!"))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

//css
gulp.task('css', function() {
 return gulp.src(['dist/css/*.css', '!dist/css/base.css'])
    .pipe(concatCss("vendor.css"))
    .pipe(autoprefixer({ browsers: ['last 2 versions','> 1%', 'IE 7'], cascade: false }))
    .pipe(minifyCss())
    .pipe(rename("vendor.min.css"))
    .pipe(notify("Done!"))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

// html
gulp.task('html', function () {
    gulp.src('app/*.html')
    .pipe(connect.reload());
})

//js
gulp.task('js', function() {
  return gulp.src(['./dist/js/*.js', '!./dist/js/main.js'])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(rename("vendor.min.js"))
    .pipe(notify("Done!"))
    .pipe(gulp.dest('./dist/js'));
});

//img
gulp.task('img', function() {
    gulp.src('./app/img/*')
        .pipe(imagemin())
        .pipe(notify("Img Done!"))
        .pipe(gulp.dest('./dist/img'))
});

//bower
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
        directory : "app/bower_components"
    }))
    .pipe(gulp.dest('./app'));
});


//watch
gulp.task('watch', function(){
    gulp.watch('bower.json',['bower']);
    gulp.watch('app/sass/*.scss', ['sass']);
    gulp.watch('app/*.html', ['html']);
});

//reloader
gulp.task('reloader', ['connect', 'sass', 'html','bower','watch']);


//clean
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

//build
gulp.task('build', ['clean'], function () {
    // var assets = useref.assets();

    return gulp.src('app/*.html')
        // .pipe(assets)
        // .pipe(gulpif('*.js', uglify()))
        // .pipe(gulpif('*.css', minifyCss()))
        // .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});


gulp.task('cleanJs', function () {
    return gulp.src(['dist/js/*.js', '!dist/js/main.js', '!dist/js/vendor.min.js'], {read: false})
        .pipe(clean());
});
gulp.task('cleanCss', function () {
    return gulp.src(['dist/css/*.css', '!dist/css/base.css','!dist/css/vendor.min.css'], {read: false})
        .pipe(clean());
});

//last
gulp.task('last', ['css', 'js']);

//cleaner
gulp.task('cleaner', ['cleanJs', 'cleanCss']);

/*Tasks order
gulp reloader
gulp build (index.file)
gulp last
COPY CSS/JS files
gulp cleaner
gulp img
copy necessary files
*/
