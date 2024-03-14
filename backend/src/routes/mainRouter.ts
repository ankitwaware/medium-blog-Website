import { Hono } from "hono";

// routes
import blogRoute from "./blog";
import userRoute from "./user";

const mainRouter = new Hono();

mainRouter.route("/blog", blogRoute);
mainRouter.route("/user", userRoute);

export default mainRouter;
