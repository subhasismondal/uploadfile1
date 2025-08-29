const db = require("../config/db.config");
const Examspls = db.examspls;
const Op = db.Sequelize.Op;

// ✅ Create a new entry
exports.create = (req, res) => {
  const { word, definition, syno, anto, translation_hi, part_of_speech } = req.body;

  if (!word || !definition) {
    return res.status(400).json({ message: "'word' and 'definition' are required." });
  }

  Examspls.create({ word, definition, syno, anto, translation_hi, part_of_speech })
    .then(data => res.status(201).json({ message: "Entry created successfully.", data }))
    .catch(err => res.status(500).json({ message: err.message || "Error creating entry." }));
};

// ✅ Get all entries (with optional search + pagination + random order)
exports.findAll = (req, res) => {
  const search = req.query.word;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const condition = search ? { word: { [Op.like]: `%${search}%` } } : null;

  Examspls.findAndCountAll({
    where: condition,
    order: db.sequelize.random(), // ✅ RANDOM ORDER
    limit,
    offset,
  })
    .then(result => {
      res.json({
        totalItems: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        data: result.rows
      });
    })
    .catch(err => res.status(500).json({ message: err.message || "Error retrieving entries." }));
};

// ✅ Get one entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Examspls.findByPk(id)
    .then(data => {
      if (data) res.json(data);
      else res.status(404).json({ message: `No entry found with id=${id}.` });
    })
    .catch(err => res.status(500).json({ message: `Error retrieving id=${id}` }));
};

// ✅ Update an entry by ID
exports.update = (req, res) => {
  const id = req.params.id;

  Examspls.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) res.json({ message: "Updated successfully." });
      else res.status(404).json({ message: `Cannot update id=${id}. Not found or empty body.` });
    })
    .catch(err => res.status(500).json({ message: `Error updating id=${id}` }));
};

// ✅ Delete one entry by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Examspls.destroy({ where: { id } })
    .then(num => {
      if (num == 1) res.json({ message: "Deleted successfully." });
      else res.status(404).json({ message: `Cannot delete id=${id}. Not found.` });
    })
    .catch(err => res.status(500).json({ message: `Error deleting id=${id}` }));
};

// ✅ Delete all entries
exports.deleteAll = (req, res) => {
  Examspls.destroy({ where: {}, truncate: false })
    .then(nums => res.json({ message: `${nums} entries deleted.` }))
    .catch(err => res.status(500).json({ message: err.message || "Error deleting all entries." }));
};
