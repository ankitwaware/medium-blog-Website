import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import BlogDetail from "../components/BlogDetail";
import axios from "axios";
import { axiosInstance } from "../config";

async function loader({ params }: LoaderFunctionArgs) {
  try {
    const blogId = params.id;
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return redirect("/signin");
    const url = `blog/${blogId}`;
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
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

export default function BlogDetailsPage() {
  const { post } = useLoaderData();

  const date = new Date(post.createdAt);
  const dateArray = date.toUTCString().split(" ");

  return (
    <BlogDetail
      title={post.title}
      content={post.content}
      publishedDate={`${dateArray[2]} ${dateArray[1]},${dateArray[3]}`}
      autherName={post.author.name}
    />
  );
}

BlogDetailsPage.loader = loader;
