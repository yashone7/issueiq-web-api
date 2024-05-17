import type { Context } from "hono";
import _ from "lodash";
import Issue from "../database/schemas/issue";
import {
  generateAnswerForQuery,
  generateAnswerForQueryBasedOnPrevContext,
} from "../utils";
import { GenerativeModel } from "@google/generative-ai";
import Solution from "../database/schemas/solutions";
import { nanoid } from "nanoid";

const modelParams = {
  model: "gemini-pro",
};

const API_KEY = process.env.AI_API_KEY as string;

// Initializing GenAI model
const model = new GenerativeModel(API_KEY, modelParams);

export async function createSolution(context: Context) {
  try {
    console.log(context.req.param());

    const issue_id = context.req.param()?.issue_id;

    console.log(issue_id);

    if (_.isEmpty(issue_id)) {
      return context.json({ message: "issue_id is required" }, 400);
    }

    // get the issue from the DB
    const issue = await Issue.findById(issue_id);
    // generate a prompt
    console.log(issue);
    const solutionPrompt = generateAnswerForQuery(issue?.description as string);
    // send the prompt to api and get response
    const solutionResponse = (
      await model.generateContent([solutionPrompt])
    ).response.text();

    console.log(solutionResponse);

    const solution_id = nanoid();

    const chat_response = [
      { question: issue?.description, answer: solutionResponse },
    ];

    // store response in db
    const solution = await Solution.create({
      solution_id,
      issue_id,
      chat_response,
    });

    // keep updating the response based on their interaction

    return context.json(solution);
  } catch (err) {
    console.log(err);
    return context.text("solution creation failed", 500);
  }
}

export async function updateSolution(context: Context) {
  try {
    console.log(context.req.param());
    const questionBody = await context.req.json();

    // **solution_id is nano_id**

    const solution_id = context.req.param()?.solution_id;

    console.log(solution_id);

    if (_.isEmpty(solution_id)) {
      return context.json({ message: "issue_id is required" }, 400);
    }

    if (_.isEmpty(questionBody)) {
      return context.json({ message: "Question is required..." }, 400);
    }
    const solution = await Solution.findOne({ solution_id: solution_id });
    const issue = await Issue.findById(solution?.issue_id);

    const solutionPrompt = generateAnswerForQueryBasedOnPrevContext(
      questionBody.text,
      issue?.description as string
    );
    // send the prompt to api and get response
    const solutionResponse = (
      await model.generateContent([solutionPrompt])
    ).response.text();

    const continued_chat = [
      { question: questionBody.text, answer: solutionResponse },
    ];

    const updatedSolution = await Solution.findOneAndUpdate(
      { solution_id: solution_id },
      { $push: { chat_response: { $each: continued_chat } } },
      { new: true, upsert: false }
    );

    return context.json({ message: "solution updated", updatedSolution });
  } catch (err) {
    console.log(err);
    return context.text("failed to update solution", 500);
  }
}
