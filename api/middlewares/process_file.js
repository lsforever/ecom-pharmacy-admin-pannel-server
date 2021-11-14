const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const maxCount = 100;

const processSingleFile = (field) => multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: maxSize },
}).single(field);

const processFileArray = (field) => multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: maxSize },
}).array(field, maxCount);



module.exports = { processSingleFile, processFileArray }