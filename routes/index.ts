import { Hono } from "hono";
import issues from './issues'
import solutions from './solutions'

const app = new Hono()


app.get("/", c => c.text("welcome to IssueIQ API"))
app.route("/issues", issues)
app.route("/solutions", solutions)

export default app