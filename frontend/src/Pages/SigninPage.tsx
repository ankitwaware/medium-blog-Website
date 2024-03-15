import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import Quote from "../components/Quote";
import FormInput from "../components/UI/FormInput";
import { signinInput } from "@ankit_waware/commen";
import { ChangeEvent, useState } from "react";
import { axiosInstance } from "../config";
import axios from "axios";

export default function SigninPage() {
  const [input, setInput] = useState<signinInput>({
    email: "",
    password: "",
  });

  const actionData = useActionData();

  if (actionData) {
    console.log(actionData);
  }

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
  try {
    const fromData = await request.formData();

    const userInputs = {
      email: fromData.get("email"),
      password: fromData.get("password"),
    };

    const response = await axiosInstance.post(
      "user/signin",
      {
        ...userInputs,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    if (response.status === 200) {
      localStorage.removeItem("authToken");
      localStorage.setItem("authToken", response.data.token);
      return redirect("/");
    }

    return response.data;
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

SigninPage.action = action;
