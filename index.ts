import { Hono } from "hono";
import { logger } from "hono/logger";
import api from "./routes/index";
import connectDB from "./database/initDB";

const app = new Hono();

connectDB();

const PORT = process.env.PORT;

app.use(logger());

app.get("/", (c) => c.text("Hello Bun!"));
app.route("/api", api);

export default {
  port: PORT,
  fetch: app.fetch,
};
