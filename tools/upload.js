// https://portal.qiniu.com/kodo/bucket/resource?bucketName=fairyever

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
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: 'fairyever' + ':' + base + filePath
    })
    const uploadToken = putPolicy.uploadToken(mac)
    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z0
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    formUploader.putFile(uploadToken, base + filePath, filePathFull, putExtra, function(respErr, respBody, respInfo) {
      if (respErr) return reject(respErr)
      if (respInfo.statusCode == 200) resolve(respBody)
      else reject(new Error(respBody))
    })
  })
}

module.exports = upload
