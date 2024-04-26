const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

// Ensure the directory structure is set up
const directories = ['dist', 'dist/css', 'dist/js'];
directories.forEach(dir => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Function to compile and minify SCSS to CSS
function styles() {
    return gulp.src('src/scss/master.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
}

// JavaScript tasks
function jsHeader() {
    return gulp.src('src/js/header/**/*.js')  // All JS files under src/js/header
        .pipe(concat('header.js'))
        .pipe(gulp.dest('dist/js'));
}

function jsFooter() {
    return gulp.src('src/js/footer/**/*.js')  // All JS files under src/js/footer
        .pipe(concat('footer.js'))
        .pipe(gulp.dest('dist/js'));
}

// Watch task: Watches SCSS and JS files for changes
function watch() {
    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('src/js/header/**/*.js', jsHeader); // Watch for changes in the header JS files
    gulp.watch('src/js/footer/**/*.js', jsFooter); // Watch for changes in the footer JS files
}

exports.styles = styles;
exports.jsHeader = jsHeader;
exports.jsFooter = jsFooter;
exports.watch = watch;
exports.default = gulp.series(styles, jsHeader, jsFooter, watch);
