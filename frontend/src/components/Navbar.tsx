import { Link, NavLink } from "react-router-dom";
import Avatar from "./UI/Avatar";

export default function Navbar() {
  const name = localStorage.getItem("username") || "Anonymous";

  return (
    <nav className="flex justify-between items-center px-6 py-3 border-b-2">
      <Link to={"/"}>
        <h4 className="font-medium border px-1.5 py-1 rounded-md bg-gray-200">
          Medium
        </h4>
      </Link>
      <div className="flex items-center gap-x-3">
        <NavLink
          to={"blog/publish"}
          className="rounded-lg px-2 py-0.5 bg-red-500 text-white text-sm"
        >
          Publish
        </NavLink>
        <Avatar username={name} className="size-8" />
      </div>
    </nav>
  );
}
