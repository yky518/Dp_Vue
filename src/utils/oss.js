let OSS = require('ali-oss');

const getSignatureUrl=(tokenData,object_key)=>{
  let client = new OSS({
    accessKeyId: tokenData.AccessKeyId,
    accessKeySecret: tokenData.AccessKeySecret,
    stsToken: tokenData.SecurityToken,
    bucket: 'deeplibrary0',
    endpoint: 'oss-cn-beijing.aliyuncs.com',
  });
  let url = client.signatureUrl(object_key,{expires: 600})
  return url
}

export default getSignatureUrl;
