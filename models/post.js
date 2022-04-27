const mongoose = require('mongoose');
// Optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String
  },
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    userName: String,
    userAvatar: String
  },
  comments: [commentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);