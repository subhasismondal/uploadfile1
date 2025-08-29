module.exports = (sequelize, Sequelize) => {
  const Studynotes = sequelize.define("studynotes", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING(2000), // increase length if needed
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

  return Studynotes;
};
