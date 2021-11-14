const Cloud = require('@google-cloud/storage')
const path = require('path')
const serviceKey = path.join(__dirname, './niraamoy-9c17683a78c6.json')

const config = require('config')
const GCS_PROJECT_ID = config.get('GCS_PROJECT_ID')

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: GCS_PROJECT_ID,
})

module.exports = storage