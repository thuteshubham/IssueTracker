const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let IssueSchema = new Schema({
  issueId: {
    type: String,
    default: "",
    index: true,
    unique: true
  },

  title: {
    type: String,
    default: ""
  },

  reporter: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    default: "NOT_ASSIGNED"
  },

  flag: {
    type: String,
    default: ""
  },

  description: {
    type: String,
    default: "Description not available"
  },

  assignee: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  comments: [],
  watchers: [],

  reportedOn: {
    type: Date,
    default: new Date()
  }
});

mongoose.model("Issue", IssueSchema);
