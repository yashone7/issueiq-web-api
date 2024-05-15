import { pgTable, serial, text, pgEnum, timestamp, json } from "drizzle-orm/pg-core";

export const priorityEnum = pgEnum('priority', ['Low', 'Medium', 'High', 'Urgent'])
export const statusEnum = pgEnum('status', ['Open', 'Completed', 'In Progress', 'On Hold', "Duplicate", "Reopened"])

export const issues = pgTable('issues', {
  issue_id: serial('id').primaryKey(),
  category: text('category'),
  summary: text('summary'),
  description: text('description'),
  priority: priorityEnum('priority'),
  status: statusEnum('status'),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt'),
  reporter: json('reporter').default({name: "", email: ""}),
  asignee: json('asignee').default({name: "", email: ""}),
  comments: json('comments'),
  classification_result: json('classification_result')
});