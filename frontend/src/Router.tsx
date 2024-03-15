import { createBrowserRouter } from "react-router-dom";
import BlogsPage from "./Pages/BlogsPage";
import SignupPage from "./Pages/SignupPage";
import SigninPage from "./Pages/SigninPage";
import RootLayout from "./components/RootLayout";
import BlogDetailsPage from "./Pages/BlogDetailsPage";
import PostBlogPage from "./Pages/PostBlogPage";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: BlogsPage.loader,
        element: <BlogsPage />,
      },
      {
        path: "blog/:id",
        loader: BlogDetailsPage.loader,
        element: <BlogDetailsPage />,
      },
      {
        path: "blog/publish",
        action: PostBlogPage.action,
        Component: PostBlogPage,
      },
      {
        path: "signup",
        action: SignupPage.action,
        element: <SignupPage />,
      },
      {
        path: "signin",
        action: SigninPage.action,
        element: <SigninPage />,
      },
    ],
  },
]);

export default BrowserRouter;
