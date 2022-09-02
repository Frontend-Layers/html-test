import glob from 'glob'
import fs from 'fs'
import { post } from './post.js'
import chalk from 'chalk';

/**
 * HTML Test
 */
async function htmlTest(folder) {

  glob(folder, '', (err, files) => {
    if (err) {
      return err
    }

    files.forEach(function (file) {
      fs.readFile(file, async (err, data) => {
        if (err) {
          console.log(err);
        } else {

          let results = await post(data.toString())

          if (results.length > 0) {
            results.forEach(item => {

              if (item.type === 'error') {
                console.log(`\n` + chalk.gray(file) + `(${item.lastLine}:${item.lastColumn}) ` + `${item.message}` + chalk.green(`\n${item.extract}`))
              }
            });
          }
        }
      });
    })
  })
}

export default htmlTest