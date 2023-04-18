import { glob } from 'glob';
import fs from 'fs';
import { post } from './post.js';
import chalk from 'chalk';

/**
 * HTML Test
 */
const htmlTest = async (folder = '', ignore = '') => {

  /**
   * Requests Delay
   *
   * @param {*} ms
   * @returns
   */
  // function delay(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  async function process(data, file) {

    let results = await post(data.toString());
    if (results && results.length > 0) {
      results.forEach(item => {
        if (item.type === 'error') {
          console.log(`\n[${item.lastLine}:${item.lastColumn}] ` + chalk.gray(file) + `\n${item.message}` + chalk.green(`\n${item.extract}`));
        }
      });
    }

  }

  const files = await glob(folder, ignore);


  // Max Requests
  const maxReq = 5;

  let filesLength = files.length;

  // let iterations = Math.ceil(filesLength / maxReq);
  let iterations = 1;

  if (filesLength > 0) {
    if (ignore) {

    }

    for (let i = 1; i <= iterations; i++) {
      let filesSlice = files.splice(0, maxReq);

      filesSlice.forEach((file) => {
        fs.readFile(file, async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            process(data.toString(), file);
          }
        });
      });

      // if (iterations > 1) {
      //   await delay(1000)
      // }

    }
  }

};

export default htmlTest;