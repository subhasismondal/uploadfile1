const db = require("../config/db.config");
const Studynotes = db.studynotes;
const Op = db.Sequelize.Op;
 exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const studynotes = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  Studynotes.create(studynotes)
    .then(data => {
      res.status(201).json({
        message: "Note registered successfully!",
        data
      })

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Notes."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Studynotes.findAll({ order: [['updatedAt', 'DESC']] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Studynotes."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Studynotes.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Studynotes with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Studynotes.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "StudyNotes was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update StudyNotes with id=${id}. Maybe StudyNotes was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating StudyNotes with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Studynotes.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "StudyNotes was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete StudyNotes with id=${id}. Maybe StudyNotes was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete StudyNotes with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Studynotes.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} StudyNotes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Studynotes.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving StudyNotes."
      });
    });
};

exports.findByCategory = (req, res) => {
  const category = req.params.category;

  StudyNotes.findAll({ where: { category } })
    .then(data => res.json(data))
    .catch(err => {
      res.status(500).json({ message: "Error retrieving notes by category" });
    });
};
