const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');
const auth = require('../middleware/auth');

router.post('/', auth, responseController.createResponse);

module.exports = router;
