const fs = require('fs')
const fsp = fs.promises
const os = require('os')
const path = require('path')
const crypto = require("crypto")

const PATH_TO_DB = path.resolve(__dirname, 'fileNotes.db')

function createHash(data) {
  hash = crypto.createHash("sha1");
  return hash.update(data).digest("base64");
}

function addFilesToObject(parentDirPath, obj = {}) {
  
  const files = fs.readdirSync(parentDirPath)
  files.forEach(
    (file) => {
        try {
          const pathToFile = path.resolve(parentDirPath, file)
          const fileStats = fs.statSync(pathToFile)
          const { birthtimeMs: creation, size } = fileStats;
          const hashData = { name:file, creation, size };
          const fileHash = createHash(JSON.stringify(hashData));
          const notes = file + " " + 'this is an example note';
          obj[fileHash] = notes
        } catch (err) {

        }
    }
  )

  return obj
}

async function seed() {
  const database = addFilesToObject(os.homedir())
  fs.writeFileSync(PATH_TO_DB, JSON.stringify(database))
}

seed()

module.exports = { addFilesToObject }
