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
      return c.json({ errors: result.error });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      c.status(406);
      return c.json({
        errors: { message: "Email Already Exist." },
      });
    }

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.username,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const token = await sign(
      {
        userId: newUser.id,
      },
      c.env.secret
    );

    return c.json({ token, username: newUser.name });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ errors: { message: "error while signing up" } });
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
      return c.json({ errors: result.error });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        errors: { message: "Invalid Email and Password" },
      });
    }

    const token = await sign(
      {
        userId: user?.id,
      },
      c.env.secret
    );

    return c.json({
      token: token,
      username: user.name,
    });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: { message: "error while signing up" } });
  }
});

export default userRouter;
