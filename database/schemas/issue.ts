import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  author: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  text: { type: String, required: true },
});

const categorySchema = new Schema({
  tags: {
    type: [String],
  },
  // weights: mongoose.Schema.Types.Mixed,
});

const IssueSchema = new Schema(
  {
    issue_id: { type: String, required: true },
    // category: categorySchema,
    category: { type: String },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "Normal", "High", "Very High"],
    },
    status: {
      type: String,
      required: true,
      enum: [
        "Open",
        "Completed",
        "In Progress",
        "On Hold",
        "Duplicate",
        "Reopened",
      ],
    },
    reporter: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    assignee: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model("Issue", IssueSchema);

export default Issue;
