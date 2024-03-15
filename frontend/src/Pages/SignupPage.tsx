import { ActionFunctionArgs, Form, Link, redirect } from "react-router-dom";
import Quote from "../components/Quote";
import FormInput from "../components/UI/FormInput";
import { ChangeEvent, useState } from "react";
import { signupInput } from "@ankit_waware/commen";
import { axiosInstance } from "../config";
import axios from "axios";

export default function SignupPage() {
  const [input, setInput] = useState<signupInput>({
    username: "",
    email: "",
    password: "",
  });

  function onchangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    setInput((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
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
              id="username"
              type="text"
              label="Username"
              value={input.username}
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
  try {
    const fromData = await request.formData();

    const userInputs = {
      username: fromData.get("username"),
      email: fromData.get("email"),
      password: fromData.get("password"),
    };

    const response = await axiosInstance.post(
      "user/signup",
      {
        ...userInputs,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("username", response.data.username);
      return redirect("/blogs");
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Access to config, request, and response
      return err.response?.data;
    } else {
      // Just a stock error
      alert(err);
    }
  }
}

SignupPage.action = action;
