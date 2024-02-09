import React, { useEffect, useState } from "react";
import Header from "../components/header";
import useRedirectTo from "@/utils/redirect";
import Layout from "@/components/layout";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = React.useState({});
  const { redirectToLogin } = useRedirectTo();

  const reset = () => {
    setError({});
    setUsers([]);
  };
  async function fetchUsers() {
    reset();
    try {
      const response = await fetch("/api/users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      if (!response.ok) {
        redirectToLogin(data);
        throw new Error(
          data.error || "Erreur lors de la récupération des données",
        );
      }
      for (let user of data) {
        if (!user.allergies || user.allergies.length === 0) {
          data = data.filter((u) => u.username !== user.username);
        } else {
          for (let allergy of user.allergies) {
            if (allergy.isPrivate && allergy.isPrivate === true) {
              user.allergies = user.allergies.filter(
                (a) => a.allergy !== allergy.allergy,
              );
            }
            if(!user.allergies || user.allergies.length === 0) {
                data = data.filter((u) => u.username !== user.username)
            }
          }
        }
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
      <h1>Atchoum!</h1>
      <div>{error.message && `Error: ${error.message}`}</div>
      <h2>Allergies</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <span>{user.username}</span>
            <ul>
              {user.allergies.map((allergy, index) => (
                <li key={index}>{allergy.allergy}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
