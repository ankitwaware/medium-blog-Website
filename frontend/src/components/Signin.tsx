import { Link, Form } from "react-router-dom";
import FormInput from "./UI/FormInput";


export default function Signin() {
  return (
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
            placeholder="m@example.com"
          />
          <FormInput id="password" type="password" label="Password" />

          <button
            type="submit"
            className="bg-black w-full text-white p-2 rounded-md font-semibold"
          >
            Sign In
          </button>
        </Form>
      </div>
    </div>
  );
}


