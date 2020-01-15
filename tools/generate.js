const argv = process.argv.splice(2)
if (argv.length !== 2) return
const [ AK, SK ] = argv
console.log(AK)
console.log(SK)