import gulp from 'gulp'
const { parallel, series, watch } = gulp

import htmlTest from './index.js'

const htmlTestRes = () =>
  htmlTest('./html/**/*.html')

const watcher = () => {
  watch('./html/*.html', htmlTestRes)
}
export default series(
  parallel(
    series(htmlTestRes),
    watcher
  )
)

