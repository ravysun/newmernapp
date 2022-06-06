const express = require('express');
const router = express.Router();

const {
  getPostGoals,
  setPostGoal,
  updatePostGoal,
  deletePostGoal,
} = require('../controllers/postgoalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPostGoals).post(protect, setPostGoal);
router
  .route('/:id')
  .put(protect, updatePostGoal)
  .delete(protect, deletePostGoal);

module.exports = router;
