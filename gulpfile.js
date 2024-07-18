const jsWatch = ["./assets/js/app.js"],
  jsFiles = ["./assets/js/app.js", "./assets/js/*.js", "!./assets/js/*.min.js"],
  cssWatch = ["./assets/scss/*.scss", "./assets/scss/layout/*.scss", "./assets/scss/utils/*.scss"],
  cssFiles = ["./assets/scss/app.scss"];

// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
import gulp from "gulp";
const { src, dest, watch, series, parallel } = gulp;

// Importing all the Gulp-related packages we want to use
import gulp_sourcemaps from "gulp-sourcemaps";
const { init, write } = gulp_sourcemaps;

import gulp_sass from "gulp-sass";
import * as dartSass from "sass";
const sass = gulp_sass(dartSass);

import babel from "gulp-babel";
import gulp_uglify_es from "gulp-uglify-es";
const minifyjs = gulp_uglify_es.default;
import autoPrefixer from "gulp-autoprefixer";
import plumber from "gulp-plumber";
import concat from "gulp-concat";
import merge from "merge2";

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  const cssBackFiles = src(cssFiles, { base: "./" })
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(plumber())
    .pipe(init())
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(concat("app.min.css"))
    .pipe(write("."))
    .pipe(dest("./assets/scss/"));

  return merge(cssBackFiles);
}

// JS Task: minify scripts
function jsTask() {
  const jsBackFiles = src(jsFiles, { base: "./" })
    .pipe(
      babel({
        presets: [
          [
            "@babel/env",
            {
              modules: "commonjs",
            },
          ],
        ],
      })
    )
    .pipe(minifyjs())
    .pipe(concat("app.min.js"))
    .pipe(dest("./assets/js/"));

  return merge(jsBackFiles);
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
  watch([...cssWatch, ...jsWatch], series(parallel(scssTask, jsTask)));
}

// Export the default Gulp task, so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
const _default = series(parallel(scssTask, jsTask), watchTask);
export { _default as default };
