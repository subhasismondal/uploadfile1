module.exports = (sequelize, Sequelize) => {
  const Examspls = sequelize.define("examspls", {
    word: {
      type: Sequelize.STRING,
      allowNull: false
    },
    definition: {
      type: Sequelize.STRING,
      allowNull: false
    },
    syno: {
      type: Sequelize.STRING,
      allowNull: false
    },
    anto: {
      type: Sequelize.STRING,
      allowNull: false
    },
    translation_hi: {
      type: Sequelize.STRING,
      allowNull: false
    },
    part_of_speech: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Examspls;
};
