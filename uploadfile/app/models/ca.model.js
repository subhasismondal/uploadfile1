module.exports = (sequelize, Sequelize) => {
	const ca = sequelize.define('ca', {
	  title: {
		type: Sequelize.STRING
	  },
	  description: {
		type: Sequelize.STRING
	  },
	  urltoimage: {
		type: Sequelize.STRING
	  },
	  url: {
		type: Sequelize.STRING
	  },
		photo: {
		type: Sequelize.STRING
		},
	  path: {
		type: Sequelize.STRING
  },
	});

	return ca;
}
