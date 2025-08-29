module.exports = (sequelize, Sequelize) => {
    const Vocabularies = sequelize.define("vocabularies", {
      word: {
        type: Sequelize.STRING,
        allowNull: false
      },
      definition: {
        type: Sequelize.STRING,
        allowNull: false
      },
      translation_en: {
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
      },
      uses: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Vocabularies;
  };