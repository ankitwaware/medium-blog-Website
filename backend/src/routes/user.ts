import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { Hono } from "hono";
import { SignupInput, SigninInput } from "@ankit_waware/commen";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    secret: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const result = SignupInput.safeParse(body);

    if (!result.success) {
      c.status(403);
      return c.json({ error: "invalid Inputs" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      c.status(406);
      return c.json({ message: "email Already exist" });
    }

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.username,
      },
    });

    const token = await sign(
      {
        userId: newUser.id,
      },
      c.env.secret
    );

    return c.json({ token });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const result = SigninInput.safeParse(body);

    if (!result.success) {
      c.status(403);
      return c.json({ error: "invalid Inputs" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const token = await sign(
      {
        userId: user?.id,
      },
      c.env.secret
    );

    return c.json({
      token: token,
    });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
});

export default userRouter;
