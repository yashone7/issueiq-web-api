import mongoose from "mongoose";

const { Schema } = mongoose;

const SolutionItemSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const SolutionSchema = new Schema(
  {
    issue_id: { type: String, required: true },
    solution_id: { type: String, required: true },
    chat_response: [SolutionItemSchema],
  },
  {
    timestamps: true,
  }
);

const Solution = mongoose.model("Solution", SolutionSchema);

export default Solution;
