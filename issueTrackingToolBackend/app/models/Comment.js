const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let CommentSchema = new Schema({
  commentId: {
    type: String,
    default: ""
  },

  issueId: {
    type: String,
    default: ""
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  comment: {
    type: String,
    default: ""
  },

  commentedOn: {
    type: Date,
    default: new Date()
  }
});

mongoose.model("Comment", CommentSchema);
