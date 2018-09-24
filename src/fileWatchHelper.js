const fs = require('fs')
const path = require('path')
const os = require('os')

fs.watch(path.resolve(os.homedir()),{recursive: true}, (event, filename) => {
  if (!filename.startsWith('AppData')) {
    console.log('event/filename', event, filename)
  }
})