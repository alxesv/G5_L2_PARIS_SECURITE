import Layout from "@/components/layout";
import useRedirectTo from "@/utils/redirect";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Admin() {
  const [error, setError] = React.useState({});
  const [users, setUsers] = useState([]);
  const { redirectToLogin } = useRedirectTo();
  const reset = () => {
    setError({});
    setUsers([]);
  };
  async function fetchUsers() {
    try {
      reset();
      const response = await fetch("/api/users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        redirectToLogin(data);
        throw new Error(
          data.error || "Erreur lors de la récupération des données",
        );
      }
      setUsers(data);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <h1>Admin</h1>
      <div>{error.message && `Error: ${error.message}`}</div>
      <h2>Users list</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <Link href={"admin/" + user.username}>{user.username}</Link>{" "}
            <span>{user.isAdmin ? "Admin" : ""}</span>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
