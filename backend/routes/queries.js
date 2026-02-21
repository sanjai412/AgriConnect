const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const queryController = require('../controllers/queryController');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post('/', auth, upload.single('image'), queryController.createQuery);
router.get('/', auth, queryController.getQueries);
router.get('/:id', auth, queryController.getQueryById);

module.exports = router;
