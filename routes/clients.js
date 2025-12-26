// routes/clients.js
const express = require('express');
const { body } = require('express-validator');
const { auth, role } = require('../middlewares/authMiddleware');
const { createRequest, contactProvider } = require('../controllers/clientController');

const router = express.Router();

router.post('/requests', auth, role('client'), [
  body('serviceRequested').notEmpty(),
  body('budget').optional().isNumeric(),
  body('location').optional().isString(),
  body('urgency').optional().isString(),
  body('categories').optional().isArray()
], createRequest);

router.patch('/requests/:id/contact', auth, role('client'), [
  body('serviceId').notEmpty()
], contactProvider);

module.exports = router;
