var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  commentOn: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
}, {timestamps: true});

// Requires population of comment
CommentSchema.methods.toJSONFor = function(comment){
  return {
    id: this._id,
    body: this.body,
    createdAt: this.createdAt,
    commentOn: this.commentOn.toJSONFor(comment)
  };
};

mongoose.model('Comment', CommentSchema);
