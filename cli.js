/* write a CLI interface for the "replace" function and your files

  command line arguments:
    1: the file you want to read from
    2: the old string to replace
    3: the new string to replace it with
    4: the file you want to write to

  examples:
  $ node cli.js the-book-of-sand.txt the any sand-the-any.txt
  $ node cli.js the-library-of-babel.txt f g library-f-g.txt

  behavior:
  : parse command line arguments from process.argv
    (let the user know if they are missing any arguments!)
  : read from the selected file in the './files' directory
  : use your logic function to create the new text
  : write to the new file
  : console.log a nice message letting the user know what happened

  little challenges:
  : -help
    if a user passes in "-help" as any command line argument,
    log a little description of how the CLI works
  : -list
    if a user passes in "-list" as any command line argument,
    log a list of all the file names in "./files"
*/

const fs = require("fs");
const path = require("path");
const util = require("util");
const logic = require("./logic/index.js"); //use logic from here

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const readdirPromise = util.promisify(fs.readdir);
const FILES_DIR = path.join(__dirname, "files");

const DOC_STRING = `
COMMANDS:
  cli.js <original_filename> <string_to_replace> <string_to_replace_with> <output_filename>
    cli.js reads the <original_filename> and replace all <string_to_replace> with 
    the <string_to_replace_with> and write the result into the<output_filename>
FLAGS:
  -list
    print the list of available files
  -h
    print this helpful message
`;
if (process.argv.includes("-h")) {
  console.log(DOC_STRING);
  // this line tells Node to stop right now, done, end, finished.
  //  it's kind of like an early return, but for a node app
  process.exit(0);
}

let list = fs.readdirSync(FILES_DIR);
if (process.argv.includes("-list")) {
  ////////// Write it
  // this line tells Node to stop right now, done, end, finished.
  //  it's kind of like an early return, but for a node app
  console.log(...list);
  process.exit(0);
}

const srcFile = process.argv[2];
const srcStr = process.argv[3];
const dstStr = process.argv[4];
const dstFile = process.argv[5];

if (list.indexOf(srcFile) === -1) {
  //If there is no such file
  console.log(`File "${srcFile}" does not exist. Cannot read.`);
  process.exit(0);
} else {
  let text = fs.readFileSync(path.join(FILES_DIR, srcFile), "utf-8");
  fs.writeFileSync(path.join(FILES_DIR, dstFile), logic(text, srcStr, dstStr));
  console.log(
    `All instances of ${srcStr} were replaced with ${dstStr} and saved into the ${dstFile}.`
  );
}
