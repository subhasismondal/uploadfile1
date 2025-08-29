const db = require("../config/db.config");
const Quiz = db.quiz;
const Op = db.Sequelize.Op;

// ✅ Create a new quiz
exports.create = (req, res) => {
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    answer,
    category,
    explanation,
  } = req.body;

  if (!question || !optionA || !optionB || !optionC || !optionD || !answer) {
    return res.status(400).json({
      message: "All required fields must be provided!",
    });
  }

  const quiz = {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    answer,
    category,
    explanation,
  };

  Quiz.create(quiz)
    .then((data) => {
      res.status(201).json({
        message: "Quiz created successfully!",
        data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the quiz.",
      });
    });
};

// ✅ Fetch all quizzes (optional filters + pagination + random order)
exports.findAll = (req, res) => {
  const { question, category } = req.query;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
  const offset = (page - 1) * limit;

  const condition = {};
  if (question) condition.question = { [Op.like]: `%${question}%` };
  if (category) condition.category = category;

  Quiz.findAll({
    where: condition,
    order: db.sequelize.random(), // ✅ RANDOM ORDER
    limit,
    offset,
  })
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving quizzes.",
      })
    );
};

// ✅ Fetch quizzes by category (with pagination + random order)
exports.findByCategory = (req, res) => {
  const category = req.params.category;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
  const offset = (page - 1) * limit;

  if (!category) {
    return res.status(400).json({ message: "Category parameter is required" });
  }

  Quiz.findAll({
    where: { category },
    order: db.sequelize.random(), // ✅ RANDOM ORDER
    limit,
    offset,
  })
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        message: err.message || "Error retrieving quizzes by category",
      })
    );
};
