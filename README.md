# HTML Test

_Node.js library for testing HTML files on the fly and output errors in the console with Gulp.js compatibilities_


[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/andreymatin/html-test/LICENSE)
[![npm](https://img.shields.io/npm/v/html-test.svg)](https://www.npmjs.com/package/html-test)


<img src=https://raw.githubusercontent.com/andreymatin/html-test/main/screen.png alt=screenshot width=640>


## How to install

### npm

```shell
npm i html-test
```

### yarn

```shell
yarn add html-test
```

## How to use

```javascript
import htmlTest from 'htmlTest'

htmlTest('./html/**/*.html')
```

## Gulp.js integration

```javascript
import gulp from 'gulp'
const { parallel, series, watch } = gulp

import htmlTest from 'htmlTest'

const htmlTestRes = () =>
  htmlTest('./html/**/*.html')

const watcher = () => {
  watch('./html/**/*.html', htmlTestRes)
}

export default series(
  parallel(
    series(htmlTestRes),
    watcher
  )
)
```

## Limitations

Server limitation is 5 requests by one time. To extend it need to add iterations timeout (~1s).
It means validation will be processed with ignorance some of the requests to avoid waiting delays.

## Recommendations

It's created for fast and rought in-development results without boring test delays and information overflow.
So it shows only critical errors in a minimalistic way.

For full report with flexible configuration, I recommend:

- automation by gulp.js: https://github.com/center-key/gulp-w3c-html-validator
- online - https://validator.w3.org/

---
[MIT License](LICENSE)