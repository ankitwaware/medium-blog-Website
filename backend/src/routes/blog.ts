import { CreatePostInput, UpdatePostInput } from "@ankit_waware/commen";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

type Variables = {
  userId: string;
};

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    secret: string;
  };
  Variables: Variables;
}>();

// middleware
blog.use("*", async (c, next) => {
  const authToken = c.req.header("Authorization");

  if (!authToken) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  const token = authToken.split(" ")[1];
  const payload = await verify(token, c.env.secret);

  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  c.set("userId", payload.id);
  await next();
});

blog.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const Allposts = await prisma.post.findMany({});

    if (!Allposts) {
      return c.json({
        msg: "no posts",
      });
    }

    return c.json({
      Allposts,
    });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "error while geting all blog" });
  }
});

blog.post("/", async (c) => {
  try {
    const userId = c.get("userId");

    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const result = CreatePostInput.safeParse(body);

    if (!result.success) {
      c.status(403);
      return c.json({ message: "invalid title and content" });
    }

    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({
      id: newPost.id,
    });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "error while posting blog" });
  }
});

blog.put("/", async (c) => {
  try {
    const userId = c.get("userId");

    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const result = UpdatePostInput.safeParse(body);

    if (!result.success) {
      c.status(403);
      return c.json({ message: "invalid id or title or content" });
    }

    await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.text("Updated post");
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "error while updating blog" });
  }
});

blog.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const userId = c.get("userId");

    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findFirst({
      where: {
        id: id,
        authorId: userId,
      },
    });

    if (!post) {
      c.status(404);
      return c.json({ error: "post not found" });
    }

    return c.json({
      post,
    });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "error while updating blog" });
  }
});

export default blog;
