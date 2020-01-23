const fs = require('fs')
const path = require('path')

async function write (filePath, fileName, value) {
  const mkdir = require('./mkdir')
  await mkdir(filePath)
  await fs.writeFileSync(path.join(filePath, fileName), value)
}

module.exports = write
