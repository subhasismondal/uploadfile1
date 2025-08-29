// models/quiz.model.js
module.exports = (sequelize, Sequelize) => {
  const Quiz = sequelize.define("quizzes", {
    question: {
      type: Sequelize.STRING
    },
    optionA: {
      type: Sequelize.STRING
    },
    optionB: {
      type: Sequelize.STRING
    },
    optionC: {
      type: Sequelize.STRING
    },
    optionD: {
      type: Sequelize.STRING
    },
    answer: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    explanation: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false  // ✅ disables createdAt and updatedAt
  });

  return Quiz;
};
