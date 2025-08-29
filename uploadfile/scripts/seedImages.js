const path = require('path');
const fs = require('fs');
const db = require('../app/config/db.config');
const Image = db.images;

// ✅ Correct path to the uploads folder
const uploadDir = path.join(__dirname, '../resources/static/assets/uploads');

function seedImages() {
  const files = fs.readdirSync(uploadDir);

  files.forEach(async (file) => {
    try {
      const imagePath = path.join('resources/static/assets/uploads', file);

      await Image.create({
        type: 'upload',
        photo: file,
        path: imagePath.replace(/\\/g, '/'), // Normalize slashes for DB
        title: file.split('.')[0],
        description: 'Auto-seeded image',
        postdate: new Date().toISOString().slice(0, 10),
      });

      console.log(`Inserted: ${file}`);
    } catch (err) {
      console.error(`Failed to insert ${file}:`, err.message);
    }
  });
}

seedImages();
