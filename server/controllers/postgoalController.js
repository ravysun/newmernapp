const asyncHandler = require('express-async-handler');
const POSTGOAL = require('../models/postgoalModel');

const getPostGoals = asyncHandler(async (req, res) => {
  const postgoals = await POSTGOAL.find({ postuser: req.postuser.id });

  res.status(200).json(postgoals);
});

const setPostGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const postgoal = await POSTGOAL.create({
    text: req.body.text,
    postuser: req.postuser.id,
  });

  res.status(200).json(postgoal);
});

const updatePostGoal = asyncHandler(async (req, res) => {
  const postgoal = await POSTGOAL.findById(req.params.id);

  if (!postgoal) {
    res.status(400);
    throw new Error('Postgaol not found');
  }

  if (!req.postuser) {
    res.status(401);
    throw new Error('Postuser not found');
  }

  if (postgoal.postuser.toString() !== req.postuser.id) {
    res.status(401);
    throw new Error('Postuser not authorized');
  }

  const updatedpostgoal = await POSTGOAL.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedpostgoal);
});

const deletePostGoal = asyncHandler(async (req, res) => {
  const postgoal = await POSTGOAL.findById(req.params.id);

  if (!postgoal) {
    res.status(400);
    throw new Error('Postgaol not found');
  }

  if (!req.postuser) {
    res.status(401);
    throw new Error('Postuser not found');
  }

  if (postgoal.postuser.toString() !== req.postuser.id) {
    res.status(401);
    throw new Error('Postuser not authorized');
  }

  await postgoal.remove();

  res.json({ id: req.params.id });
});

module.exports = {
  getPostGoals,
  setPostGoal,
  updatePostGoal,
  deletePostGoal,
};
