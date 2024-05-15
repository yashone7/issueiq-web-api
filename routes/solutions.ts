import { Hono } from "hono";

const app = new Hono();

app.get("/", c => c.json({id:1, route: "solutions route"}))

export default app