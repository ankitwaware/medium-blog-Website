import { Hono } from "hono";
import mainRouter from "./routes/mainRouter";

const app = new Hono();

app.get("/hello", (c) => {
  return c.text("Hello Hono");
});

// grouping
app.route("/api/v1", mainRouter);

export default app;
