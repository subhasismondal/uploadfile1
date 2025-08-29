module.exports = (sequelize, Sequelize) => {
  return sequelize.define("rootwords", {
    slno: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    root: {
      type: Sequelize.STRING
    },
    meaning: {
      type: Sequelize.STRING
    },
    example_word1: {
      type: Sequelize.STRING
    },
    example_word2: {
      type: Sequelize.STRING
    },
    example_word3: {
      type: Sequelize.STRING
    },
    example_word4: {
      type: Sequelize.STRING
    },
    example_word5: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  });
};
