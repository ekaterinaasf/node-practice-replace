const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const readFilePromise = util.promisify(fs.readFile);

const sandbox = require("./logic/sandbox");

const app = express();

const REPORT_FILE = path.join(__dirname, "test/report.json");

app.use(cors());
app.use(bodyParser.json());

// // GET: '/files'
// // response: {status: 'ok', files: ['all.txt','file.txt','names.txt']}
// app.get("/files", async (req, res) => {
//   try {
//       let list = await readDir()
//   } catch (err) {}
// });

// // POST: '/files/add/:name'
// //  body: {text: "file contents"}
// //  write a new files into ./files with the given name and contents
// // redirect -> GET: '/files'
// app.post("/files/add/:name", async (req, res) => {
//   try {
//   } catch (err) {}
// });

// // PUT: '/files/replace/:oldFile/:newFile'
// //  body: {toReplace: "str to replace", withThis: "replacement string"}
// //  route logic:
// //    read the old file
// //    use the replace function to create the new text
// //    write the new text to the new file name
// //  note - params should not include .txt, you should add that in the route logic
// // failure: {status: '404', message: `no file named ${oldFile}`  }
// // success: redirect -> GET: '/files'
// app.put("/files/replace/:oldFile/:newFile", (req, res) => {
//   try {
//   } catch (err) {}
// });

app.use("/files", sandbox);

// GET: '/report'
//  reads the contents from ./test/report.json and sends it
// response: {status: 'ok', report }
app.get("/report", async (req, res) => {
  try {
    let report = await readFilePromise(REPORT_FILE, "utf-8");
    res.json({ status: "ok", report });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Replacer is serving at http://localhost:${port}`)
);
