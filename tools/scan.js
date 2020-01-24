const fs = require('fs')
const path = require('path')
const shortid = require('shortid')
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
		element.id = shortid.generate()
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
				url,
				path: filePathFull
			})
			if (uploaded) {
				element.url = uploaded.url
				element.height = uploaded.height
				element.width = uploaded.width
			}
		}
		result.push(element)
	}
  return result
}

module.exports.scan = scan

/**
 * @description 将原始的扫描结果处理为特殊的格式
 * @param {Array} source 原始的扫描结果
 */
function maker (source) {
	// 过滤之后的元素
	let elements = []
	// 被筛选出来的特殊属性
	let customProps = {}
	function sortFunction (a, b) {
		if (a.elements) return -1
		return 1
	}
	source.forEach(el => {
		if (el.elements) {
			const result = maker(el.elements)
			for (const key in result.customProps) {
				el[key] = result.customProps[key]
			}
			el.elements = result.elements.sort(sortFunction)
			elements.push(el)
		} else if (/^_/.test(el.name)) {
			customProps[el.name.replace(/^_/, '')] = el.url
		} else {
			elements.push(el)
		}
	})
	return {
		elements,
		customProps
	}
}

module.exports.maker = maker
