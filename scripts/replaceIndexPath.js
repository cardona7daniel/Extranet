'use strict';

const fs = require('fs');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
// Ensure environment variables are read.
require('../config/env');

const indexFile = 'build/index.html';
const regexIndexFile = /="\//g;

const pathMainJs = 'build/static/';
const regexIndexFileMain = /static\/js/g;

const pathLess = 'build/static/';
const regexFileLess = /\/fontawesome\/fontawesome-webfont\./gm;

fs.readFile(indexFile, 'utf8', (err, data) => {
  if (err) throw err;
  const newStringFile = data.replace(regexIndexFile, `="${process.env.REACT_APP_URL_BASE}`);

  fs.writeFile(indexFile, newStringFile, (err) => {
    if (err) throw err;
    console.log("The file was saved!");
  });

  const fileJsName = newStringFile.match(/js.(main\..+\.js)/gm)[0];

  fs.readFile((pathMainJs + fileJsName), 'utf8', (errMain, dataMain) => {
    if (errMain) throw err;
    const newStringFileMain = dataMain.replace(
      regexIndexFileMain,
      `${process.env.REACT_APP_URL_BASE.replace(/^\//i, '')}static/js`,
    );

    fs.writeFile(pathMainJs + fileJsName, newStringFileMain, (errMain2) => {
      if (errMain2) throw errMain2;
      console.log("The file was saved!");
    });
  });

  const fileLessName = newStringFile.match(/css.(main\..+\.css)/gm)[0];

  fs.readFile((pathLess + fileLessName), 'utf8', (errLess, dataLess) => {
    if (errLess) throw err;
    const newStringFileLess = dataLess.replace(
      regexFileLess,
      `${process.env.REACT_APP_URL_BASE}fontawesome/fontawesome-webfont.`,
    );

    fs.writeFile(pathLess + fileLessName, newStringFileLess, (errLess2) => {
      if (errLess2) throw errLess2;
      console.log("The file was saved!");
    });
  });

  const fileLessMapName = `${fileLessName}.map`;

  fs.readFile((pathLess + fileLessMapName), 'utf8', (errLessMap, dataLessMap) => {
    if (errLessMap) throw err;
    const newStringFileLessMap = dataLessMap.replace(
      regexFileLess,
      `${process.env.REACT_APP_URL_BASE}fontawesome/fontawesome-webfont.`,
    );

    fs.writeFile(pathLess + fileLessMapName, newStringFileLessMap, (errLessMap2) => {
      if (errLessMap2) throw errLessMap2;
      console.log("The file was saved!");
    });
  });

});
