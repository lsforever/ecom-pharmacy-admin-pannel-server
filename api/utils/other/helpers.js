const { format } = require("util");
const gc = require('../../../config/index')

const config = require('config')
const GCS_BUCKET_NAME = config.get('GCS_BUCKET_NAME')
const STORAGE_BASE_URL = config.get('STORAGE_BASE_URL')
const bucket = gc.bucket(GCS_BUCKET_NAME) // bucket name

const mime = require('mime-types')



const uploadImage = (file, folder, name_without_extention) => new Promise((resolve, reject) => {

  //const { originalname, buffer } = file
  const { buffer, mimetype } = file


  const blob = bucket.file(folder + '/' + name_without_extention.replace(/ /g, "_") + '.' + mime.extension(mimetype))
  const blobStream = blob.createWriteStream({
    // metadata: {
    //   contentType: "image/png"
    // },
    resumable: false
  })
  blobStream.on('finish', () => {
    const publicUrl = format(
      `${STORAGE_BASE_URL}${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
    .on('error', () => {
      reject(`Unable to upload image, something went wrong`)
    })
    .end(buffer)
})


const uploadImageBase64 = (file_string, name) => new Promise((resolve, reject) => {

  //var base64EncodedImageString = file_string.split(',')[1];
  var base64EncodedImageString = file_string.replace(/^data:image\/\w+;base64,/, '')
  let imageBuffer = Buffer.from(base64EncodedImageString, "base64");

  //let mimeType2 = base64EncodedImageString.profilepic.match(/[^:/]\w+(?=;|,)/)[0];
  console.log(base64EncodedImageString)
  //console.log(mimeType2)
  console.log(name)

  const blob = bucket.file('images/' + name.replace(/ /g, "_"))
  const blobStream = blob.createWriteStream({
    // metadata: {
    //   contentType: "image/png"
    // },
    resumable: false
  })
  blobStream.on('finish', () => {
    const publicUrl = format(
      `${STORAGE_BASE_URL}${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
    .on('error', () => {
      reject(`Unable to upload image, something went wrong`)
    })
    .end(imageBuffer)
})



const deleteFileWithFileName = async (file_name) => {
  try {
    await bucket.file(file_name).delete()
  }
  catch { }
}
module.exports = { uploadImage, uploadImageBase64, deleteFileWithFileName }