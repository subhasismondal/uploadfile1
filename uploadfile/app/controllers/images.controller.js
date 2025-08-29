const db = require("../config/db.config");
const Images = db.images;

// Create a new Image
exports.create = (req, res) => {
  const { type, photo, path, title, description, postdate } = req.body;

  if (!photo || !title) {
    return res.status(400).json({ message: "Title and photo are required." });
  }

  const newImage = {
    type,
    photo,
    path,
    title,
    description,
    postdate,
  };

  Images.create(newImage)
    .then(data => {
      res.status(201).json({
        message: "Image uploaded successfully!",
        data
      });
    })
    .catch(err => {
      console.error("Error creating image:", err);
      res.status(500).json({
        message: err.message || "Some error occurred while uploading the image."
      });
    });
};

// Get all images
exports.findAll = (req, res) => {
  Images.findAll({
    order: [['createdAt', 'DESC']],
  })
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.error("Error fetching images:", err);
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving images.",
      });
    });
};

// Get one image by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Images.findByPk(id)
    .then(data => {
      if (data) res.json(data);
      else res.status(404).json({ message: "Image not found" });
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving image with id=" + id
      });
    });
};

// Update image
exports.update = (req, res) => {
  const id = req.params.id;

  Images.update(req.body, {
    where: { id }
  })
    .then(num => {
      if (num == 1) {
        res.json({ message: "Image updated successfully." });
      } else {
        res.status(404).json({ message: `Cannot update image with id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating image with id=" + id
      });
    });
};

// Delete image
exports.delete = (req, res) => {
  const id = req.params.id;

  Images.destroy({
    where: { id }
  })
    .then(num => {
      if (num == 1) {
        res.json({ message: "Image deleted successfully." });
      } else {
        res.status(404).json({ message: `Cannot delete image with id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not delete image with id=" + id
      });
    });
};

// Delete all images
exports.deleteAll = (req, res) => {
  Images.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.json({ message: `${nums} images were deleted successfully.` });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while deleting all images."
      });
    });
};
