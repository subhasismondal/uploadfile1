module.exports = function(app) {
  const studynotes = require("../controllers/studynotes.controller");
  const upload = require('../config/upload.config');
  const uploadca = require('../config/ca.config');
  const fileWorker = require('../controllers/upload.controller.js');
  const caworker = require('../controllers/ca.controller.js');
  const qa = require('../controllers/quiz.controller.js');
  const vocab = require('../controllers/vocab.controller.js');
  const rootwords = require('../controllers/rootwords.controller');
  const idioms = require('../controllers/idioms.controller');
  const images = require('../controllers/images.controller');
  const examspls = require('../controllers/examspls.controller');
  // File Upload
  app.post('/api/uploadfile', upload.single("photo"), fileWorker.upload);
  app.get('/api/allnotes', fileWorker.findAll);

  // CA Upload
  app.post('/api/uploadcas', uploadca.single("photo"), caworker.uploadca);
  app.get('/api/allcas', caworker.findAll);

  // Quiz Routes
  app.post("/api/createqa", qa.create);
  app.get("/api/allqa", qa.findAll);  // Supports ?category=XYZ
  app.get("/api/allqa/category/:category", qa.findByCategory);

  // Study Notes
  app.post("/api/studynotes", studynotes.create);
  app.get("/api/studynotes", studynotes.findAll);
  app.get("/api/published", studynotes.findAllPublished);
  app.get("/api/studynotes/:id", studynotes.findOne);
  app.put("/api/studynotes/:id", studynotes.update);
  app.delete("/api/studynotes/:id", studynotes.delete);
  app.get("/api/studynotes/category/:category", studynotes.findByCategory);


  // Vocabulary
  app.post('/api/vocabularies', vocab.create);
  app.get('/api/vocabularies', vocab.findAll);
  app.get('/api/vocabularies/:id', vocab.findOne);
  app.put('/api/vocabularies/:id', vocab.update);
  app.delete('/api/vocabularies/:id', vocab.delete);
  app.delete('/api/vocabularies', vocab.deleteAll);

  // Root Words
  app.post('/api/rootwords', rootwords.create);
  app.get('/api/rootwords', rootwords.findAll);
  app.get('/api/rootwords/:id', rootwords.findOne);
  app.put('/api/rootwords/:id', rootwords.update);
  app.delete('/api/rootwords/:id', rootwords.delete);
  app.delete('/api/rootwords', rootwords.deleteAll);

  app.post('/api/idioms', idioms.create);
  app.get('/api/idioms', idioms.findAll);
  app.get('/api/idioms/:id', idioms.findOne);
  app.put('/api/idioms/:id', idioms.update);
  app.delete('/api/idioms/:id', idioms.delete);
  app.delete('/api/idioms', idioms.deleteAll);

    // Examspls
  app.post('/api/examspls', examspls.create);
  app.get('/api/examspls', examspls.findAll);
  app.get('/api/examspls/:id', examspls.findOne);
  app.put('/api/examspls/:id', examspls.update);
  app.delete('/api/examspls/:id', examspls.delete);
  app.delete('/api/examspls', examspls.deleteAll);


  // Images
  app.post('/api/images', images.create);
  app.get('/api/images', images.findAll);
  app.get('/api/images/:id', images.findOne);
  app.put('/api/images/:id', images.update);
  app.delete('/api/images/:id', images.delete);
  app.delete('/api/images', images.deleteAll);

};
