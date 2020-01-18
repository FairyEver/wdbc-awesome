const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./tools/database.json')
const db = low(adapter)

db.defaults({
  uploadedFiles: []
})
  .write()

module.exports.uploadedFileFind = (file) => {
  return db.get('uploadedFiles')
    .find(file)
    .value()
}

module.exports.uploadedFileAdd = (file) => {
  db.get('uploadedFiles')
    .push(file)
    .write()
}
