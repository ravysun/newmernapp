const express = require('express');
const {
  registerpostUser,
  loginpostUser,
  getMe,
} = require('../controllers/postuserController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', registerpostUser);
router.post('/login', loginpostUser);
router.get('/me', protect, getMe);

module.exports = router;
