const argv = process.argv.splice(2)
if (argv.length !== 2) {
  console.log('没有设置 AK SK')
  return
}
const [ AK, SK ] = argv
console.log(`AK ${AK}`)
console.log(`SK ${SK}`)