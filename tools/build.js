(async () => {
  const argv = process.argv.splice(2)
  if (argv.length !== 2) {
    console.log('没有设置 AK SK')
    return
  }
  global.AK = argv[0]
  global.SK = argv[1]
  
  const path = require('path')
  const resolve = dir => path.join(__dirname, dir)
  
  const scan = require('./scan')
  
  const libraryFolder = resolve('../library')
  
  const libraryFolderScanResult = await scan({
    folderPath: libraryFolder
  })

  const write = require('./write')

  await write(resolve('../build/materials.json'), JSON.stringify(libraryFolderScanResult, null, 2))
})()
