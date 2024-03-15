import { redirect, useLoaderData } from "react-router-dom";
import BlogCard from "../components/UI/BlogCard";
import { axiosInstance } from "../config";
import axios from "axios";

async function loader() {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return redirect("/signin");
    const response = await axiosInstance.get("blog/all", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Access to config, request, and response
      console.log(error);
      return error.response?.data;
    } else {
      // Just a stock error
      alert(error);
    }
  }
}

interface posts {
  id: "c5073bc4-7531-4293-bc63-30058a3209ee";
  title: "blog title";
  content: "blog content";
  published: false;
  createdAt: "2024-03-14T15:02:11.457Z";
  updatedAt: "2024-03-14T15:11:29.184Z";
  authorId: "51c18ce6-5b8d-4160-ba21-da853055f01e";
  author: { name: "test1" };
}

export default function BlogsPage() {
  const { Allposts } = useLoaderData() as { Allposts: posts[] };

  return (
    <div className="grid items-start auto-rows-max h-screen mx-auto w-4/5 md:w-9/12 lg:w-1/2">
      {Allposts.map((post) => {
        const date = new Date(post.createdAt);
        const dateArray = date.toUTCString().split(" ");

        return (
          <BlogCard
            key={post.id}
            blogId={post.id}
            username={post.author.name}
            publishedDate={`${dateArray[2]} ${dateArray[1]},${dateArray[3]}`}
            title={post.title}
            content={post.content}
          />
        );
      })}
    </div>
  );
}

BlogsPage.loader = loader;
