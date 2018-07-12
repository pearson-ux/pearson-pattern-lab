/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GULP
 * The gulp wrapper around patternlab-node core, providing tasks to interact with the core library.
******************************************************/
const gulp = require('gulp'),
      argv = require('minimist')(process.argv.slice(2)),
      sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano'),
      sourcemaps = require('gulp-sourcemaps');

/******************************************************
 * PATTERN LAB  NODE WRAPPER TASKS with core library
******************************************************/
const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/patternlab-node')(config);

function build() {
  return patternlab.build({
    watch: argv.watch,
    cleanPublic: config.cleanPublic
  }).then(() =>{
    // do something else when this promise resolves
  });
}

function serve() {
  return patternlab.serve({
    cleanPublic: config.cleanPublic
  }
).then(() => {
    // do something else when this promise resolves
    gulp.watch('scss/*.scss', ['style']);
    gulp.watch('source/_patterns/**/*.scss', ['style']);
    gulp.watch('source/_patterns/**/**/*.scss', ['style']);
  });
}

gulp.task('patternlab:version', function () {
  patternlab.version();
});

gulp.task('patternlab:help', function () {
  patternlab.help();
});

gulp.task('patternlab:patternsonly', function () {
  patternlab.patternsonly(config.cleanPublic);
});

gulp.task('patternlab:liststarterkits', function () {
  patternlab.liststarterkits();
});

gulp.task('patternlab:loadstarterkit', function () {
  patternlab.loadstarterkit(argv.kit, argv.clean);
});

gulp.task('patternlab:build', function () {
  build().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('patternlab:serve', function () {
  serve().then(() => {
  });
});

gulp.task('patternlab:installplugin', function () {
  patternlab.installplugin(argv.plugin);
});

gulp.task('default', ['patternlab:help']);

// compile scss
gulp.task('style', function () {
  return gulp.src('scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass()).on('error', sass.logError)
  // Use postcss with autoprefixer and compress the compiled file using cssnano
  .pipe(postcss([
    autoprefixer({
      browsers: ['last 2 version', 'safari > 6', 'ie 11', 'opera 12.1', 'ios 6', 'android > 3','Firefox > 47'],
      cascade: false
    }),
    cssnano()
  ]))
  // Now add/write the sourcemaps
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('source/css'))
  .pipe(gulp.dest('public/css'));
});

gulp.task('start', ['patternlab:serve', 'style']);
