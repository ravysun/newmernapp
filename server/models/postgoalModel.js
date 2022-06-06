const mongoose = require('mongoose');

const postgoalSchema = mongoose.Schema(
  {
    postuser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'POSTUSER',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('POSTGOAL', postgoalSchema);
