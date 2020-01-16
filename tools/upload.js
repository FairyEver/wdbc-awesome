const qiniu = require('qiniu')

const base = 'wdbc-awesome'

const accessKey = global.AK
const secretKey = global.SK
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

async function upload ({
  filePath,
  filePathFull
}) {
  return new Promise((resolve, reject) => {
    var options = {
      scope: 'fairyever' + ':' + base + filePath
    }
    var putPolicy = new qiniu.rs.PutPolicy(options)
    var uploadToken = putPolicy.uploadToken(mac)
    var config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z0
  
    var formUploader = new qiniu.form_up.FormUploader(config)
    var putExtra = new qiniu.form_up.PutExtra()
    // 文件上传
    formUploader.putFile(uploadToken, base + filePath, filePathFull, putExtra, function(respErr, respBody, respInfo) {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode == 200) {
        console.log(respBody)
        resolve(respBody)
      } else {
        console.log(respInfo.statusCode)
        console.log(respBody)
        reject(new Error(respBody))
      }
    })
  })
}

module.exports = upload
