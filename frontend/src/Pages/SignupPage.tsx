import { ActionFunctionArgs, Form, Link } from "react-router-dom";
import Quote from "../components/Quote";
import FormInput from "../components/UI/FormInput";
import { useState } from "react";
export default function SignupPage() {
  const [input, setInput] = useState({
    name: "",
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
          <h1 className="text-4xl font-bold mb-2">Create an account</h1>
          <h4 className="text-lg font-medium text-slate-500 mb-6">
            Already have an account?
            <Link to={"/signin"} className="ml-2 underline">
              Login
            </Link>
          </h4>

          <Form action="/signup" method="post">
            <FormInput
              id="name"
              type="text"
              label="Username"
              value={input.name}
              onChange={onchangeHandler}
              placeholder="Enter your username"
            />
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
              value={input.password}
              onChange={onchangeHandler}
              label="Password"
            />
            <button
              type="submit"
              className="bg-black w-full text-white p-2 rounded-md font-semibold"
            >
              Sign Up
            </button>
          </Form>
        </div>
      </div>
      <Quote />
    </div>
  );
}

async function action({ request }: ActionFunctionArgs) {
  const SignupInputs = await request.formData();

  const userInputs = {
    name: SignupInputs.get("name"),
    email: SignupInputs.get("email"),
    password: SignupInputs.get("password"),
  };
  console.log(userInputs);

  return true;
}

SignupPage.action = action;
