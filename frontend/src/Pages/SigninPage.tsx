import { ActionFunctionArgs, Form, Link } from "react-router-dom";
import Quote from "../components/Quote";
import FormInput from "../components/UI/FormInput";
import { signinInput } from "@ankit_waware/commen";
import { useState } from "react";

export default function SigninPage() {
  const [input, setInput] = useState<signinInput>({
    email: "",
    password: "",
  });

  function onchangeHandler(e) {
    const name = e.target.name;
    setInput((prev) => {
      return {
        ...prev,
        [name]: e.target.value,
      };
    });
  }

  return (
    <div className="bg-white h-screen grid lg:grid-cols-2">
      <div className="text-gray-950 flex flex-col justify-center items-center">
        <div className="w-3/5 text-center bg-white">
          <h1 className="text-4xl font-bold mb-2">Login to account</h1>
          <h4 className="text-lg font-medium text-slate-500 mb-6">
            Dont't have an account?
            <Link to={"/signup"} className="ml-2 underline">
              SignUp
            </Link>
          </h4>

          <Form action="/signin" method="post">
            <FormInput
              id="email"
              type="email"
              label="Email"
              value={input.email}
              onChange={onchangeHandler}
              placeholder="m@example.com"
            />
            <FormInput
              id="password"
              type="password"
              label="Password"
              value={input.password}
              onChange={onchangeHandler}
            />

            <button
              type="submit"
              className="bg-black w-full text-white p-2 rounded-md font-semibold"
            >
              Sign In
            </button>
          </Form>
        </div>
      </div>
      <Quote />
    </div>
  );
}

async function action({ request }: ActionFunctionArgs) {
  const SigninInputs = await request.formData();

  const userInputs = {
    email: SigninInputs.get("email"),
    password: SigninInputs.get("password"),
  };
  console.log(userInputs);

  return true;
}

SigninPage.action = action;
