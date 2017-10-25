'use strict';

const fs = require('fs-extra');

module.exports = {
  
  /**
   * @name copyToFolder
   * @description Copy the contents from one folder to another.
   * Does require the full path
   * @param {string} from - The source folder
   * @param {string} to - the destination folder
   * @return {Promise}
   */
  copyToFolder: (from, to ) => {
    return new Promise( (res, rej) => {
      fs.copy(from, to, err => {

        // handle the error
        if (err) {
          rej(err);
          return;
        }

        res(); // resolve the promise

        /* eslint no-console:0 */
        console.log(`Copied files from ${from} to ${to} success!!`);
      });
    });
  }
};
