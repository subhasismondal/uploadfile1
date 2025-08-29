const fs = require('fs');
const db = require('../config/db.config');
const Image = db.images;
exports.upload = (req, res) => {
	Image.create({
		title: req.body.title,
		description: req.body.description,
		postdate : req.body.postdate,
		type: req.file.mimetype,
		photo: req.file.originalname,
		path: 'http://65.20.72.240:8081/'+ req.file.originalname,
	}).then(image => {
		try{
			res.json({'msg': 'File uploaded successfully!', 'file': req.file});
		}catch(e){
			console.log(e);
			res.json({'err': e});
		}
	})
};

exports.findAll = (req, res) => {
	Image.findAll()
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
