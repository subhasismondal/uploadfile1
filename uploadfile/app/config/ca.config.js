const multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, __basedir + '/resources/static/assets/currentaff/')
	},
	filename: (req, file, cb) => {
	  cb(null,file.originalname)
	}
});

var uploadca = multer({storage: storage});

module.exports = uploadca;
