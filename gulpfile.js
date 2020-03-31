const { src, dest, series, parallel } = require('gulp');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const del = require('del');

function css() {
    return src('src/assets/css/*.css')
        .pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(dest('dist/css'))
}

function js() {
    return src('src/assets/js/*.js', { sourcemaps: true })
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(dest('dist/js', { sourcemaps: true }))
}

function img() {
    return src('src/assets/img/**/*.{gif,jpg,png,svg}')
        .pipe(dest('dist/img'))
}

function minImg() {
    return src('src/assets/img/**/*.{gif,jpg,png,svg}')
        .pipe(imagemin())
        .pipe(dest('dist/img'))
}

function _del() {
    return del('dist/')
}

exports.js = js;
exports.css = css;
exports.img = img;
exports.minImg = minImg;
exports._del = _del;
exports.default = series(_del, parallel(css, js, img, minImg));
