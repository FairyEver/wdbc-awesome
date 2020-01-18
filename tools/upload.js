// https://portal.qiniu.com/kodo/bucket/resource?bucketName=fairyever
// https://developer.qiniu.com/kodo/manual/1235/vars#magicvar

const qiniu = require('qiniu')
const md5 = require('md5-file/promise')
const { fileFind, fileAdd } = require('./db.js')

const fileName = name => 'wdbc-awesome' + name

const accessKey = global.AK
const secretKey = global.SK
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

async function upload ({
  filePath,
  filePathFull
}) {
  function log (status) {
    console.log(`[ ${status} ] ${filePath}`)
  }
  return new Promise(async (resolve, reject) => {
    const hash = await md5(filePathFull)
    const file = {
      hash,
      filePath
    }
    const uploaded = fileFind(file)
    if (uploaded) {
      log('已经上传过')
      return resolve()
    }
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: 'fairyever' + ':' + fileName(filePath),
      returnBody: '{"height":$(imageInfo.height), "width":$(imageInfo.width)}'
    })
    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z0
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    formUploader.putFile(
      putPolicy.uploadToken(mac),
      fileName(filePath),
      filePathFull,
      putExtra,
      function(respErr, respBody, respInfo) {
        if (respErr) {
          log('上传失败')
          return reject(respErr)
        }
        if (respInfo.statusCode == 200) {
          log('上传完成')
          fileAdd(file)
          resolve({
            ...respBody,
            hash
          })
        }
        else {
          log('上传失败')
          reject(new Error(respBody))
        }
      }
    )
  })
}

module.exports = upload
