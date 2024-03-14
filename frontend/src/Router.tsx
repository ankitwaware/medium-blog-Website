import { createBrowserRouter } from "react-router-dom";
import BlogPage from "./Pages/BlogPage";
import SignupPage from "./Pages/SignupPage";
import SigninPage from "./Pages/SigninPage";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <BlogPage />,
      },
      {
        path: "/signup",
        action: SignupPage.action,
        element: <SignupPage />,
      },
      {
        path: "/signin",
        action: SigninPage.action,
        element: <SigninPage />,
      },
      {
        path: "/blogs",
        element: <div>Blogs Page new</div>,
      },
    ],
  },
]);

export default BrowserRouter;
