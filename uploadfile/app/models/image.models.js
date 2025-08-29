module.exports = (sequelize, Sequelize) => {
	const Image = sequelize.define('image', {
	  type: {
		type: Sequelize.STRING
	  },
	  photo: {
		type: Sequelize.STRING
	  },
	  path: {
		type: Sequelize.STRING
	  },
	  title: {
		type: Sequelize.STRING
	  },
	  description: {
		type: Sequelize.STRING
	  },
	  postdate: {
		type: Sequelize.STRING
	  }
	});
	
	return Image;
}