import glob from 'glob'
import fs from 'fs'
import { post } from './post.js'
import chalk from 'chalk';

/**
 * Requests Delay
 *
 * @param {*} ms
 * @returns
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * HTML Test
 */
const htmlTest = async (folder) => {
  glob(folder, '', async (err, files) => {
    if (err) {
      return err
    }

    // Max Requests
    const maxReq = 4

    let filesLength = files.length
    let iterations = Math.ceil(filesLength / maxReq);

    if (filesLength > 0) {

      for (let i = 1; i <= iterations; i++) {
        let filesSlice = files.splice(0, maxReq)
        console.log('filesSlice', filesSlice)

        filesSlice.forEach((file) => {
          fs.readFile(file, async (err, data) => {
            if (err) {
              console.log(err);
            } else {
              let results = await post(data.toString())

              if (results && results.length > 0) {
                results.forEach(item => {

                  if (item.type === 'error') {
                    console.log(`\n` + chalk.gray(file) + `(${item.lastLine}:${item.lastColumn}) ` + `${item.message}` + chalk.green(`\n${item.extract}`))
                  }
                });
              }

            }
          });
        })


        await delay(1000)
      }

    }
  })
}

export default htmlTest