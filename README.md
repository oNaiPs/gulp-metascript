# gulp-metascript

[MetaScript](https://github.com/dcodeIO/MetaScript) filter for Gulp.

## Installation

```bash
npm install --save-dev gulp-metascript
```

## Usage

```js
var metascriptPipe = require('gulp-metascript');
...
gulp.task('scripts', function() {
    return gulp.src('src/**/*.js')
        .pipe(metascriptPipe({
            //context variables
            SCOPE_VARIABLE: true,
            ...
        }))
        .pipe(gulp.dest('dst/'));
});
