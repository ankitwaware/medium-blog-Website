import { Location, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function RootLayout() {
  const location = useLocation();

  if (location.pathname === "/signin" || location.pathname === "/signup") {
    return (
      <>
        <Outlet />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
