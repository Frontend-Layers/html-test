import gulp from 'gulp';
const { parallel, watch } = gulp;

import htmlTest from './index.js';

const htmlTestRes = () =>
  htmlTest('./html/**/*.html', { ignore: ['html/ignore-me/**', 'node_modules/**'], hide: ['js-literals', 'handlebars']});

const watcher = () => {
  watch('./html/*.html', htmlTestRes);
};

export default
  parallel(
    htmlTestRes,
    watcher
  )


