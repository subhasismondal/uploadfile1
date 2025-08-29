module.exports = (sequelize, Sequelize) => {
  const Idiom = sequelize.define("idioms", {
    idiom: {
      type: Sequelize.STRING
    },
    definition: {
      type: Sequelize.STRING
    },
    hindi_meaning: {
      type: Sequelize.STRING
    },
    synonym: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false 
  });

  return Idiom;
};
