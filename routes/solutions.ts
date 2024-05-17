import { Hono } from "hono";
import { createSolution, updateSolution } from "../services/solutionService";

const app = new Hono();

app.get("/", (c) => c.json({ id: 1, route: "solutions route" }));

app.post("/issue/:issue_id", (c) => createSolution(c));

app.post("/:solution_id", (c) => updateSolution(c));

export default app;
