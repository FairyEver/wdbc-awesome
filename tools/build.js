(async () => {
  const resolve = dir => path.join(__dirname, dir)
  const path = require('path')
  const write = require('./write')
  const folder = resolve('../library')
  // 环境变量
  const argv = process.argv.splice(2)
  const { scan, maker } = require('./scan')
  if (argv.length !== 2) {
    console.log('没有设置 AK SK')
    return
  }
  global.AK = argv[0]
  global.SK = argv[1]
  // 物料
  const materials = {}
  // 扫描资料库
  materials.library = maker(await scan({ folderPath: folder })).elements
  // 生成文件
  await write(resolve('../build/materials.json'), JSON.stringify(materials, null, 2))
})()
