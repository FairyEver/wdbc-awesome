const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./tools/database.json')
const db = low(adapter)

db.defaults({
  uploadedFiles: []
})
  .write()

module.exports.uploadedFileFind = ({
  path = '',
  hash = ''
}) => {
  return db.get('uploadedFiles')
    .find({
      path,
      hash
    })
    .value()
}

module.exports.uploadedFileAdd = ({
  path = '',
  hash = ''
}) => {
  db.get('uploadedFiles')
    .push({
      path,
      hash
    })
    .write()
}
