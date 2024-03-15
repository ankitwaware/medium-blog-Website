import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { createPostInput } from "@ankit_waware/commen";
import { axiosInstance } from "../config";
import axios from "axios";

async function action({ request }: ActionFunctionArgs) {
  try {
    const fromData = await request.formData();

    const userInputs = {
      title: fromData.get("title"),
      content: fromData.get("content"),
    };
    console.log(userInputs);

    const authToken = localStorage.getItem("authToken");
    if (!authToken) return redirect("/signin");

    const response = await axiosInstance.post(
      "blog",
      {
        ...userInputs,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.status === 201) {
      alert(response.data.message);
      return redirect("/");
    }

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Access to config, request, and response
      console.log(err);
      return err.response?.data;
    } else {
      // Just a stock error
      alert(err);
    }
  }
}

export default function PostBlogPage() {
  const [postData, setPostData] = useState<createPostInput>({
    title: "",
    content: "",
  });

  function onchangeHandler(event: ChangeEvent<HTMLTextAreaElement>) {
    const name = event.target.name;
    setPostData((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  }

  return (
    <div className="grid mx-auto w-4/5 pt-5">
      <Form method="post">
        <div className="flex flex-col text-start gap-y-3 mb-6">
          <label
            htmlFor="title"
            className="font-semibold leading-none flex justify-between"
          >
            Title
          </label>
          <textarea
            id="title"
            name="title"
            placeholder="Enter title"
            autoComplete="off"
            onChange={onchangeHandler}
            rows={1}
            value={postData.title}
            className="outline-none border border-slate-400 p-2.5 rounded-md placeholder:text-slate-500 placeholder:font-medium"
          />
        </div>

        <div className="flex flex-col text-start gap-y-3 mb-6">
          <label
            htmlFor="content"
            className="font-semibold leading-none flex justify-between"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Enter content"
            autoComplete="off"
            onChange={onchangeHandler}
            rows={6}
            value={postData.content}
            className="outline-none border border-slate-400 p-2.5 rounded-md placeholder:text-slate-500 placeholder:font-medium"
          />
        </div>

        <button
          type="submit"
          className="p-2 bg-slate-300 text-gray-950 text-sm font-medium rounded-md"
        >
          Published
        </button>
      </Form>
    </div>
  );
}

PostBlogPage.action = action;
