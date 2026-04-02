const uploadToCloundinary = require("../../helper/uploadToCloudinary");

//Nhận file từ request → upload → gắn vào req.body
module.exports.uploadSigleImage = async (req, res, next) => {
    if (req.file) {
        const link = await uploadToCloundinary(req.file.buffer);
        req.body[req.file.fieldname] = link;
    }
    next();
}

//Nhận file từ request → upload → gắn vào req.body
module.exports.uploadSigleImageSocket = async (req, res, next) => {
    if (req.file) {
        const link = await uploadToCloundinary(req.file.buffer);
        req.body[req.file.fieldname] = link;
    }
}