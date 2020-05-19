const replace = require("./index.js");
const fs = require("fs");
const assert = require("assert");
const util = require("util");

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const unlinkPromise = util.promisify(fs.unlink);
const readdirPromise = util.promisify(fs.readdir);

const sanbox = {
  readDir: {},
  writeFile: {},
  replace: {},
  readReport: {},
};
