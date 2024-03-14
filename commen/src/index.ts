import z from "zod";

export const SignupInput = z.object({
  username: z.string({
    required_error: "Please Enter a valid Username",
    invalid_type_error: "Please Enter a valid Username",
  }),
  email: z.string().email({ message: "Please Enter a valid Email" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters long." }),
});
export type signupInput = z.infer<typeof SignupInput>;

export const SigninInput = SignupInput.omit({ username: true });
export type signinInput = z.infer<typeof SigninInput>;

export const CreatePostInput = z.object({
  title: z.string(),
  content: z.string(),
});
export type createPostInput = z.infer<typeof CreatePostInput>;

export const UpdatePostInput = CreatePostInput.extend({
  id: z.string(),
});

export type updatePostInput = z.infer<typeof UpdatePostInput>;
