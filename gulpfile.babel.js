import gulp from "gulp"
import babel from "gulp-babel"
import sass from "gulp-ruby-sass"
import plumber from "gulp-plumber"
import autoprefixer from "gulp-autoprefixer"
import sourcemaps from "gulp-sourcemaps"
import uglify from "gulp-uglify"

gulp.task("es6",() => {
  gulp.src("src/scripts/**/*.js")
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write("maps"))
  .pipe(gulp.dest("build/js"))
});

gulp.task("html", () => {
  gulp.src("src/*.html")
  .pipe(gulp.dest("build"))
});

gulp.task("sass", () => {
  return sass("src/sass/app.sass",{sourcemap: true})
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write("maps"))
  .pipe(gulp.dest("build/css"))
});

gulp.task("default",["html","es6","sass"],() => {
  gulp.watch("src/sass/**/*.sass",["sass"])
  gulp.watch("src/**/*.html",["html"])
  gulp.watch("src/scripts/**/*.js",["es6"])
})
