import { Hono } from "hono";
import { createIssue } from "../services/issuesService";

const app = new Hono();

app.get("/", (c) => c.json({ id: 1, route: "issues route" }));

app.post("/", (c) => createIssue(c));

export default app;
