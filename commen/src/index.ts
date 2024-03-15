import z from "zod";

export const SignupInput = z.object({
  username: z
    .string({
      required_error: "Please Enter a valid Username",
      invalid_type_error: "Please Enter a valid Username",
    })
    .trim()
    .min(1, { message: "Please Enter a valid Username" }),
  email: z.string().trim().email({ message: "Please Enter a valid Email" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be 8 or more characters long." }),
});
export type signupInput = z.infer<typeof SignupInput>;
// type User = z.infer<typeof User>;
// export type signupInputError = z.infer<typeof SignupInput.safeParseAsync>

export const SigninInput = SignupInput.omit({ username: true });
export type signinInput = z.infer<typeof SigninInput>;

export const CreatePostInput = z.object({
  title: z
    .string({
      required_error: "required",
      invalid_type_error: "Please Enter a valid Username",
    })
    .trim()
    .min(1, { message: "Please Enter a valid title" }),
  content: z
    .string({
      required_error: "required",
      invalid_type_error: "Please Enter a valid Username",
    })
    .trim()
    .min(1, { message: "Please Enter a valid content" }),
});
export type createPostInput = z.infer<typeof CreatePostInput>;

export const UpdatePostInput = CreatePostInput.extend({
  id: z
    .string({
      required_error: "required",
      invalid_type_error: "Please Enter a valid blog id",
    })
    .trim()
    .min(1, { message: "Please Enter a valid blog id" }),
});

export type updatePostInput = z.infer<typeof UpdatePostInput>;
