const fs = require('fs')
const path = require('path')

async function scan ({
  folderPath,
	needCheckIsFolder = true,
	rootFolderPath = folderPath
}) {
	let result = []
	// 检查是否为文件夹，这个判断只在递归的第一次触发
  if (needCheckIsFolder && !await fs.statSync(folderPath).isDirectory()) return result
  
	// 获得文件夹的内容
	const files = await fs.readdirSync(folderPath)
	for (const filename of files) {
		// path
		const filePathFull = path.join(folderPath, filename)
		// 是否为文件或者文件夹
		const stat = await fs.statSync(filePathFull)
		const isFile = stat.isFile()
		const isDir = stat.isDirectory()
		// 解析路径
		const parsed = path.parse(filePathFull.replace(rootFolderPath, ''))
		// 忽略点开头
		if (parsed.name[0] === '.') continue
		result.push({
			size: stat.size,
			isFile,
			isDir,
			ext: parsed.ext.replace(/^\./, ''),
			name: parsed.name,
			elements: isDir ? await scan({
				folderPath: filePathFull,
				rootFolderPath,
        needCheckIsFolder: false
			}) : []
		})
	}
  return result
}

module.exports = scan
