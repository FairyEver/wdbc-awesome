const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./tools/database.json')
const db = low(adapter)

db.defaults({
  uploaded: []
})
  .write()

module.exports.uploadedFind = file => {
  return db.get('uploaded')
    .find(file)
    .value()
}

module.exports.uploadedAdd = file => {
  db.get('uploaded')
    .push(file)
    .write()
}
