import React from "react";
import ReactDOM from "react-dom/client";
import BrowserRouter  from "./Router.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter} />
  </React.StrictMode>
);
