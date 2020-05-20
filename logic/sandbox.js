const replace = require("./index.js");
const fs = require("fs");
const assert = require("assert");
const util = require("util");
const path = require("path");

const router = express.Router();

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const readdirPromise = util.promisify(fs.readdir);

const FILES_DIR = path.join(__dirname, "/../files");

const sandbox = {
  readDir: {},
  writeFile: {},
  replace: {},
  readReport: {},
};

// GET: '/files'
// response: {status: 'ok', files: ['all.txt','file.txt','names.txt']}
router.get("/", async (req, res) => {
  try {
    let list = await readdirPromise(FILES_DIR);
    console.log(list);
    res.send({ status: "ok", files: list });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

// POST: '/files/add/:name'
//  body: {text: "file contents"}
//  write a new files into ./files with the given name and contents
// redirect -> GET: '/files'
router.post("/add/:name", async (req, res) => {
  try {
    fileName = req.params.name;
    fileContent = req.body.text;
    await writeFilePromise(path.join(FILES_DIR, fileName), fileContent);
    res.redirect(303, "/files");
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

// PUT: '/files/replace/:oldFile/:newFile'
//  body: {toReplace: "str to replace", withThis: "replacement string"}
//  route logic:
//    read the old file
//    use the replace function to create the new text
//    write the new text to the new file name
//  note - params should not include .txt, you should add that in the route logic
// failure: {status: '404', message: `no file named ${oldFile}`  }
// success: redirect -> GET: '/files'
router.put("/replace/:oldFile/:newFile", (req, res) => {
  try {
  } catch (err) {}
});
