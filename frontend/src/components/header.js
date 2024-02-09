import { getCurrentUser } from "@/utils/getCurrentUser";
import logout from "@/utils/logout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import React from "react";

export default function Header() {
  const [token, setToken] = React.useState(undefined);
  const [isAdmin, setIsAdmin] = React.useState(false);
  React.useEffect(() => {
    setToken(getCookie("accessToken"));
    return () => {
      setToken("");
    };
  }, [getCookie("accessToken")]);
  React.useEffect(() => {
    if (token) {
      const currentUser = getCurrentUser(token);
      setIsAdmin(currentUser.isAdmin === true);
    }
  }, [token]);
  return (
    <nav>
      <Link href="/">Home</Link>
      {token !== undefined ? (
        <>
          <Link href="/allergy">Add allergy</Link>
          <Link href="/my-allergies">My allergies</Link>

          {isAdmin && <Link href="/admin">Admin</Link>}
          <Link
            href="/login"
            onClick={() => {
              logout();
              setToken("");
            }}
          >
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </>
      )}
    </nav>
  );
}
