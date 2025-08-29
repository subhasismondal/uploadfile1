const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
global.__basedir = __dirname;

// ✅ Middlewares
app.use(helmet());                      // Secure headers
app.use(compression());                // Gzip compression
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://65.20.72.240:8080',
    'http://65.20.72.240:4200',
    'http://65.20.72.240:19006'
  ],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Static asset directories
app.use('/uploads', express.static(path.join(__dirname, 'resources/static/assets/uploads')));
app.use('/currentaff', express.static(path.join(__dirname, 'resources/static/assets/currentaff')));

// ✅ Database setup
const db = require('./app/config/db.config');
db.sequelize.sync({ force: false }).then(() => {
  console.log('✅ Database synced');
});

// ✅ Register routes
require('./app/routers/upload.router.js')(app);

// ✅ Angular frontend fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend-angular/dist/final/index.html'));
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
