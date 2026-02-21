const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');

router.get('/', learningController.getResources);

module.exports = router;
