const fs = require('fs')

async function write (filePath, value) {
  const mkdir = require('./mkdir')    
  await mkdir(filePath)
  await fs.writeFileSync(filePath, value)
}

module.exports = write
