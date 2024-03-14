import { Link, Form } from "react-router-dom";
import FormInput from "./UI/FormInput";

export default function Signup() {
  return (
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
            placeholder="Enter your username"
          />
          <FormInput
            id="email"
            type="email"
            label="Email"
            placeholder="m@example.com"
          />
          <FormInput id="password" type="password" label="Password" />

          <button
            type="submit"
            className="bg-black w-full text-white p-2 rounded-md font-semibold"
          >
            Sign Up
          </button>
        </Form>
      </div>
    </div>
  );
}
