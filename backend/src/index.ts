import { Hono } from "hono";
import { cors } from "hono/cors";
import mainRouter from "./routes/mainRouter";

const app = new Hono();

app.use("/api/*", cors());

app.get("/hello", (c) => {
  return c.text("Hello Hono");
});

// grouping
app.route("/api/v1", mainRouter);

export default app;
