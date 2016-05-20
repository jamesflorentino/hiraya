var gulp = require('gulp')
var connect = require('gulp-connect')
var child_exec = require('child_process').exec

var path = {
  scripts: ['./src/**/*.js']
}

function docs() {
  child_exec('yuidoc ./')
}

function server() {
  connect.server({
    root: './docs'
  })
}

function watch() {
  gulp.watch(path.scripts, ['docs'])
}

gulp.task('docs', function() {
  console.log('yo')
  docs()
})

gulp.task('server', server)
gulp.task('watch', watch)
gulp.task('docs', docs)
gulp.task('default', ['docs', 'server', 'watch'])
