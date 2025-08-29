const db = require("../config/db.config");
const Rootwords = db.rootwords;
const Op = db.Sequelize.Op;

// CREATE
exports.create = (req, res) => {
  if (!req.body.root_word) {
    res.status(400).send({
      message: "Content can not be empty! 'root_word' is required."
    });
    return;
  }

  const rootword = {
    root_word: req.body.root_word,
    meaning: req.body.meaning,
    example1: req.body.example1,
    example2: req.body.example2,
    example3: req.body.example3,
    example4: req.body.example4,
    example5: req.body.example5,
  };

  Rootwords.create(rootword)
    .then(data => {
      res.status(201).json({
        message: "Rootword registered successfully!",
        data
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Rootword."
      });
    });
};

// READ ALL
exports.findAll = (req, res) => {
  const root_word = req.query.root_word;
  const condition = root_word ? { root_word: { [Op.like]: `%${root_word}%` } } : null;

  Rootwords.findAll({
    where: condition,
    order: db.sequelize.random(),
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Rootwords."
      });
    });
};

// READ ONE
exports.findOne = (req, res) => {
  const slno = req.params.id;

  Rootwords.findByPk(slno)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Rootword with slno=${slno}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Rootword with slno=" + slno
      });
    });
};

// UPDATE
exports.update = (req, res) => {
  const slno = req.params.id;

  Rootwords.update(req.body, {
    where: { slno: slno }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Rootword was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Rootword with slno=${slno}. Maybe not found or body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Rootword with slno=" + slno
      });
    });
};

// DELETE
exports.delete = (req, res) => {
  const slno = req.params.id;

  Rootwords.destroy({
    where: { slno: slno }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Rootword was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Rootword with slno=${slno}. Maybe not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Rootword with slno=" + slno
      });
    });
};

// DELETE ALL
exports.deleteAll = (req, res) => {
  Rootwords.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Rootwords were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Rootwords."
      });
    });
};
