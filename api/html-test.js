import { glob } from 'glob';
import fs from 'fs';
import { post } from './post.js';
import chalk from 'chalk';

/**
 * HTML Test
 */
const htmlTest = async (folder = '', cfg = '') => {
  let hide = cfg.hide;
  let pattern = [];

  if (cfg.hide) {
    if (Array.isArray(hide)) {
      hide.forEach(item => {
        let p = getPattern(item);
        if (p) {
          pattern.push(p);
        }
      });
    } else {
      let p = getPattern(hide);
      if (p) {
        pattern.push(p);
      }
    }
  }

  function getPattern(item) {
    switch (item) {
      case 'js-literals':
        return /\$\{.+\}/g;
        break;

      case 'twig':
      case 'mustache':
      case 'handlebars':
        return /\{\{.+\}\}/g;
        break;
    }

    return '';
  }

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
        const msg = item.message;

        for (let i = 0; i < pattern.length; i++) {
          const reg = pattern[i];
          hide = reg.test(msg);
          if (hide) break;
        }

        if (!hide) {
          if (item.type === 'error') {
            console.log(`\n[Line: ${item.lastLine}] ` + chalk.gray(file) + `\n${msg}` + chalk.green(`\n${item.extract}`));
          }
        }
      });

    }
  }

  const files = await glob(folder, cfg);


  // Max Requests
  const maxReq = 5;

  let filesLength = files.length;

  // let iterations = Math.ceil(filesLength / maxReq);
  let iterations = 1;

  if (filesLength > 0) {
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