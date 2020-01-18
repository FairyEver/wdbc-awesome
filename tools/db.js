const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./tools/database.json')
const db = low(adapter)

db.defaults({
  files: []
})
  .write()

module.exports.fileFind = ({
  filePath = '',
  hash = ''
}) => {
  return db.get('files')
    .find({
      filePath,
      hash
    })
    .value()
}

module.exports.fileAdd = ({
  filePath = '',
  hash = ''
}) => {
  db.get('files')
    .push({
      filePath,
      hash
    })
    .write()
}
