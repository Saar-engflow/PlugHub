// routes/services.js
const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const { auth, role } = require('../middlewares/authMiddleware');
const { createService, updateService, listServices, getService } = require('../controllers/serviceController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});
const upload = multer({ storage });

const router = express.Router();

router.get('/', listServices);
router.get('/:id', getService);

router.post('/', auth, role('provider'), upload.fields([{ name: 'images' }, { name: 'samples' }]), [
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('categories').isArray({ min: 1 })
], createService);

router.put('/:id', auth, role('provider'), [
], updateService);

module.exports = router;
