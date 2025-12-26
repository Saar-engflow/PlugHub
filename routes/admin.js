// routes/admin.js
const express = require('express');
const { auth, role } = require('../middlewares/authMiddleware');
const { approveService, rejectService } = require('../controllers/adminController');

const router = express.Router();

router.patch('/services/:id/approve', auth, role('admin'), approveService);
router.patch('/services/:id/reject', auth, role('admin'), rejectService);

module.exports = router;
