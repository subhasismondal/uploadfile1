const db = require("../config/db.config");
const Vocabularies = db.vocabularies;
const Op = db.Sequelize.Op;

// ✅ Create new vocabulary
exports.create = (req, res) => {
  const { word, definition, translation_en, translation_hi, part_of_speech, uses } = req.body;

  if (!word || !definition) {
    return res.status(400).json({ message: "'word' and 'definition' are required." });
  }

  Vocabularies.create({ word, definition, translation_en, translation_hi, part_of_speech, uses })
    .then(data => res.status(201).json({ message: "Vocabulary registered successfully!", data }))
    .catch(err => res.status(500).json({ message: err.message || "Error creating vocabulary." }));
};

// ✅ Find all vocabularies with optional search, pagination, and random order
exports.findAll = (req, res) => {
  const search = req.query.word;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const condition = search ? { word: { [Op.like]: `%${search}%` } } : null;

  Vocabularies.findAndCountAll({
    where: condition,
    order: db.sequelize.random(), // ✅ Random order
    limit,
    offset
  })
    .then(result => {
      res.json({
        totalItems: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        data: result.rows
      });
    })
    .catch(err => res.status(500).json({ message: err.message || "Error retrieving vocabularies." }));
};

// ✅ Find one by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vocabularies.findByPk(id)
    .then(data => {
      if (data) res.json(data);
      else res.status(404).json({ message: `Vocabulary not found with id=${id}.` });
    })
    .catch(err => res.status(500).json({ message: `Error retrieving vocabulary with id=${id}` }));
};

// ✅ Update vocabulary
exports.update = (req, res) => {
  const id = req.params.id;

  Vocabularies.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) res.json({ message: "Vocabulary updated successfully." });
      else res.status(404).json({ message: `Cannot update Vocabulary with id=${id}. Not found or no changes.` });
    })
    .catch(err => res.status(500).json({ message: `Error updating Vocabulary with id=${id}` }));
};

// ✅ Delete one
exports.delete = (req, res) => {
  const id = req.params.id;

  Vocabularies.destroy({ where: { id } })
    .then(num => {
      if (num == 1) res.json({ message: "Vocabulary deleted successfully." });
      else res.status(404).json({ message: `Cannot delete Vocabulary with id=${id}. Not found.` });
    })
    .catch(err => res.status(500).json({ message: `Error deleting Vocabulary with id=${id}` }));
};

// ✅ Delete all
exports.deleteAll = (req, res) => {
  Vocabularies.destroy({ where: {}, truncate: false })
    .then(nums => res.json({ message: `${nums} vocabularies deleted successfully!` }))
    .catch(err => res.status(500).json({ message: err.message || "Error deleting all vocabularies." }));
};
