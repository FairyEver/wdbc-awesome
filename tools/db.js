const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./tools/database.json')
const db = low(adapter)

db.defaults({
  uploaded: []
})
  .write()

module.exports.uploadedFind = ({ path, hash }) => {
  return db.get('uploaded')
    .find({ path, hash })
    .value()
}

module.exports.uploadedAdd = file => {
  db.get('uploaded')
    .push(file)
    .write()
}
