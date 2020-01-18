const fs = require('fs')
const path = require('path')
const upload = require('./upload')

async function scan ({
  folderPath,
	needCheckIsFolder = true,
	rootFolderPath = folderPath
}) {
	let result = []
	// 检查是否为文件夹，这个判断只在递归的第一次触发
  if (needCheckIsFolder && !await fs.statSync(folderPath).isDirectory()) return result
	const files = await fs.readdirSync(folderPath)
	for (const filename of files) {
		let element = {}
		const filePathFull = path.join(folderPath, filename)
		const filePath = filePathFull.replace(rootFolderPath, '')
		const stat = await fs.statSync(filePathFull)
		const isFile = stat.isFile()
		const isDir = stat.isDirectory()
		const parsed = path.parse(filePath)
		// 忽略点开头
		if (parsed.name[0] === '.') continue
		// 元素对象
		element.size = stat.size
		element.name = parsed.name
		if (isDir) {
			element.elements = await scan({
				folderPath: filePathFull,
				rootFolderPath,
        needCheckIsFolder: false
			})
		}
		if (isFile) {
			const url = new Date().valueOf() + parsed.ext
			const uploaded = await upload({
				name: url,
				path: filePathFull
			})
			if (uploaded) {
				element.url = url
				element.height = uploaded.height
				element.width = uploaded.width
			}
		}
		result.push(element)
	}
  return result
}

module.exports = scan
