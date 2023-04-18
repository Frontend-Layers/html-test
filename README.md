# HTML Test

_Node.js library for testing HTML files on the fly and output errors in the console with Gulp.js compatibilities_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/andreymatin/html-test/LICENSE)
[![npm](https://img.shields.io/npm/v/html-test.svg)](https://www.npmjs.com/package/html-test)

<img src=https://raw.githubusercontent.com/andreymatin/html-test/main/screen.png alt=screenshot width=640>

## How to install

### npm

```shell
npm i --save-dev html-test
```

### yarn

```shell
yarn add --dev html-test
```

## How to use

```javascript
import htmlTest from 'htmlTest';

htmlTest('./html/**/*.html');
```

```javascript
import htmlTest from 'htmlTest';

htmlTest('./html/**/*.html', { ignore: 'html/ignore-me/**' });
```


## Gulp.js integration

```javascript
import gulp from 'gulp';
const { parallel, watch } = gulp;

import htmlTest from 'htmlTest';

const htmlTestRes = () =>
  htmlTest('./html/**/*.html', { ignore: ['html/ignore-me/**', 'node_modules/**'] });

const watcher = () => {
  watch('./html/*.html', htmlTestRes);
};

export default
  parallel(
    htmlTestRes,
    watcher
  )
```

## Limitations

API limitation is 5 remote requests by one time.
To extend it need to add iterations timeout (~1s).
It means validation will be processed with ignorance
some of the requests to avoid waiting delays or
need to select prioritized html files.

## Recommendations

It's created for fast and rought in-development
results without boring test delays and information overflow.
So it shows critical errors only in a minimalistic way to console.

For full report with flexible configuration, I recommend:

- automation by gulp.js - https://github.com/center-key/gulp-w3c-html-validator
- https://validator.w3.org/

## Reference

- Markup Validator Web Service API (https://validator.w3.org/docs/api.html)

## Related Projects

I created this and some additional services for [html-base](https://www.npmjs.com/package/html-base) to improve quality of frontend output. Here is the list:

- [scss-reset](https://www.npmjs.com/package/scss-reset)
- [scss-mixins-npm](https://www.npmjs.com/package/scss-mixins-npm)
- [mobile-friendly-test-npm](https://www.npmjs.com/package/mobile-friendly-test-npm)
- [html-speed](https://www.npmjs.com/package/html-speed)
- [css-test-npm](https://www.npmjs.com/package/css-test-npm)

## Contributing

For issues, bugs or imporvements please open an [issue](https://github.com/andreymatin/html-test/issues/new)


---
[MIT License](LICENSE)