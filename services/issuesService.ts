import type { Context } from "hono";
import { GenerativeModel } from "@google/generative-ai";
import _ from "lodash";
import {
  generateSummaryPrompt,
  generateTagsAndSummaryPrompt,
  generateTagsAndSummaryPromptv2,
  generateTagsPrompt,
  isPhoneComplaint,
} from "../utils";
import Issue from "../database/schemas/issue";
// Creating instances
const modelParams = {
  model: "gemini-pro",
};

const API_KEY = process.env.AI_API_KEY as string;

// Initializing GenAI model
const model = new GenerativeModel(API_KEY, modelParams);

export async function createIssue(context: Context) {
  try {
    const data = await context.req.json();
    console.log(data); // data contains description field

    const description = data?.description;

    if (_.isEmpty(description)) {
      return context.json({ message: "description should not be empty" }, 400);
    }
    // invoke summary generation API here

    const summaryPrompt = generateTagsAndSummaryPromptv2(description);

    const summary = (
      await model.generateContent([summaryPrompt])
    ).response.text();

    console.log(summary);

    const word = "sorry";

    const regex = new RegExp(`\\b${word}\\b`, "i"); // 'i' flag makes it case-insensitive
    const isWordPresent = regex.test(summary);

    if (isWordPresent) {
      return context.json({
        message: "Hey we can only assist in mobile phone related issues...",
      });
    }

    const summaryObj = JSON.parse(summary);

    console.log(_.isObject(summaryObj) ? "YES" : "NO an obj");

    // console.log(_.toArray(summaryObj.tags), "CATSED");

    const issueCount = await Issue.countDocuments();

    const issue_id = `ISSUE-${issueCount + 1}`;

    const res = await Issue.create({
      issue_id: issue_id,
      description: description,
      summary: summaryObj?.summary,
      category: _.toString(summaryObj?.tags),
      // category: summaryObj?.tags,
      status: "Open",
      priority: "Medium",
      reporter: { email: "api@issueiq.com", name: "IssueIQ API" },
      assignee: { email: "api@issueiq.com", name: "IssueIQ API" },
      comments: [],
    });

    console.log(res);

    return context.json({ message: "Issue created successfully", res: res });
    // here we get the details from the user and then create a record in the DB.
  } catch (err) {
    console.log(err);
    return context.text("issue creation failed", 500);
  }
}
