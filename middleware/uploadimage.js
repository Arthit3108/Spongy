const multer = require('multer');
const path = require('path');

module.exports = async (req, res, next) => {

        var storage = multer.diskStorage({
                destination: function(req, file, cb) {
                        const uploadPath = path.resolve(__dirname, '..', 'public/uploads');
                        cb(null, uploadPath);
                },
                filename: function(req, file, cb) {
                        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
                }
        });
        var upload = multer({
                storage: storage,
                limits: {
                        fileSize: 5 * 1024 * 1024, // Set your desired file size limit in bytes
                        },
        }).single("imageProduct");
        upload(req, res, function (err) {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ error: 'File upload failed' });
                }
        });
               
        next();

} 
    
