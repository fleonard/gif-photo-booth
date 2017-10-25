'use strict';

const fs = require('fs-extra');

module.exports = {

  /**
   * @name save
   * @description Save content to a file within a directory using fs extra's outputFile -
   * fs-extra will create the directory path for you
   * @see {@link https://github.com/jprichardson/node-fs-extra/blob/master/docs/outputFile.md|outputFile}
   * @param {string} dir - The directory path (NOT including the file)
   * @param {string} file - The filename to be used to save to
   * @param {string} body - The content to save to the file
   * @return {Promise} resolve or reject
   */
  save: (dir, file, body ) => {
    return new Promise( (res, rej) => {

      fs.outputFile(`${dir}${file}`, body, (err) => {

        if (err) {
          rej(err);
          return;
        }

        res();
      });
    });
  }
};
