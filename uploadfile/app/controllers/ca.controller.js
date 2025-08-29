const db = require('../config/db.config');
const Currentaffairs = db.ca;

// Upload a Multipart-File then saving it to MySQL database
exports.uploadca = (req, res) => {
	Currentaffairs.create({
		title: req.body.title,
		description: req.body.description,
		urltoimage : req.body.urltoimage,
        url : req.body.url
	}).then(currentaffairs => {
		try{
			res.json({'msg': 'File uploaded successfully!', 'file': req.file});
		}catch(e){
			console.log(e);
			res.json({'err': e});
		}
	})
};


exports.findAll = (req, res) => {

	Currentaffairs.findAll()
	  .then(data => {
		data.photo
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving Studynotes."
		});
	  });
  };
