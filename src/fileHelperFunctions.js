export const fs = require("fs");
export const os = require("os");
export const path = require("path");
const crypto = require("crypto");

const PATH_TO_DB = path.resolve(__dirname, "fileNotes.db");
export const db = JSON.parse(fs.readFileSync(PATH_TO_DB));

export function createHash(data) {
  const hash = crypto.createHash("sha1");
  return hash.update(data).digest("base64");
}

export function buildFileListObject(parentObj) {
  let output = {};
  fs.readdirSync(parentObj.fullPath).forEach((elem) => {
    output[elem] = createFileObject(parentObj.fullPath, elem);
  });
  return output;
}

export function createFileObject(parentDir, name = null) {
  if (name) {
    var fullPath = path.join(parentDir, name);
  } else {
    console.log("createFileObject", parentDir);
    var fullPath = parentDir;
    name = path.basename(parentDir);
    parentDir = path.dirname(parentDir) || null;
  }
  try {
    var fileStats = fs.statSync(fullPath);
    var isDirectory = fileStats.isDirectory();
    var { birthtimeMs: creation, size } = fileStats;
    var hashData = { name, creation, size };
    var fileHash = createHash(JSON.stringify(hashData));
    var note = db[fileHash] || null;
  } catch (err) {
    console.log("error in createfileobject", err);
    var fileStats = {};
    var isDirectory = false;
    var fileHash = null;
    var note = null;
  }

  return {
    name,
    parentDir,
    fullPath,
    isDirectory,
    fileStats,
    fileHash,
    note
  };
}

export function defaultDirectory() {
  return os.homedir();
}

export function updateDatabase() {
  fs.writeFile(PATH_TO_DB, JSON.stringify(db), (err) => {
    if (err) {
      console.log(err);
    }
  });
}
