// https://portal.qiniu.com/kodo/bucket/resource?bucketName=fairyever
// https://developer.qiniu.com/kodo/manual/1235/vars#magicvar

const qiniu = require('qiniu')
const md5 = require('md5-file/promise')
const { uploadedFind, uploadedAdd } = require('./db.js')
const mac = new qiniu.auth.digest.Mac(global.materials.AK, global.materials.SK)

async function upload ({
  url,
  path
}) {
  return new Promise(async (resolve, reject) => {
    function log (status) {
      console.log(`[ ${status} ] ${url}`)
    }
    const file = {
      url,
      path,
      hash: await md5(path)
    }
    const uploaded = uploadedFind(file)
    if (uploaded) {
      log('已经上传过')
      return resolve(uploaded)
    }
    const fileName = global.materials.prefix + url
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: 'fairyever' + ':' + fileName,
      returnBody: '{"height":$(imageInfo.height), "width":$(imageInfo.width)}'
    })
    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z0
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    formUploader.putFile(
      putPolicy.uploadToken(mac),
      fileName,
      path,
      putExtra,
      function(respErr, respBody, respInfo) {
        if (respErr) {
          log('上传失败')
          return reject(respErr)
        }
        if (respInfo.statusCode == 200) {
          log('上传完成')
          const result = {
            ...file,
            ...respBody
          }
          uploadedAdd(result)
          resolve(result)
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
