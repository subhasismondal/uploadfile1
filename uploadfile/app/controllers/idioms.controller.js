const db = require("../config/db.config");
const Idioms = db.idioms;
const Op = db.Sequelize.Op;

// CREATE
exports.create = (req, res) => {
  if (!req.body.idiom) {
    res.status(400).send({
      message: "Content can not be empty! 'idiom' is required."
    });
    return;
  }

  const idiom = {
    idiom: req.body.idiom,
    definition: req.body.definition,
    hindi_meaning: req.body.hindi_meaning,
    synonym: req.body.synonym
  };

  Idioms.create(idiom)
    .then(data => {
      res.status(201).json({
        message: "Idiom added successfully!",
        data
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the idiom."
      });
    });
};

// READ ALL
exports.findAll = (req, res) => {
  const search = req.query.idiom;
  const condition = search ? { idiom: { [Op.like]: `%${search}%` } } : null;

  Idioms.findAll({
    where: condition,
    order: db.sequelize.random(),
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving idioms."
      });
    });
};

// READ ONE
exports.findOne = (req, res) => {
  const id = req.params.id;

  Idioms.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Idiom with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Idiom with id=" + id
      });
    });
};

// UPDATE
exports.update = (req, res) => {
  const id = req.params.id;

  Idioms.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Idiom was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Idiom with id=${id}. Maybe not found or body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Idiom with id=" + id
      });
    });
};

// DELETE
exports.delete = (req, res) => {
  const id = req.params.id;

  Idioms.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Idiom was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Idiom with id=${id}. Maybe not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Idiom with id=" + id
      });
    });
};

// DELETE ALL
exports.deleteAll = (req, res) => {
  Idioms.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Idioms were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all idioms."
      });
    });
};
