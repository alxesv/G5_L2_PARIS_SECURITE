import Layout from "@/components/layout";
import useRedirectTo from "@/utils/redirect";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { name } = router.query;
  const [user, setUser] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [error, setError] = React.useState({});
  const [result, setResult] = React.useState({});
  const [update, setUpdate] = React.useState(false);
  const { redirectToLogin } = useRedirectTo();

  const reset = () => {
    setError({});
    setResult({});
  };
  async function fetchUser() {
    reset();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username: name }),
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
      setUser(data);
      setAllergies(data.allergies);
    } catch (error) {
      setError(error);
    }
  }

  async function handleRemove(allergy) {
    try {
      reset();
      const response = await fetch("/api/remove", {
        method: "POST",
        body: JSON.stringify({ username: name, allergy: allergy }),
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
      setUpdate((prev) => !prev);
      setAllergies(allergies.filter((allergy) => allergy.allergy !== allergy));
    } catch (error) {
      setError(error);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    reset();
    try {
      const data = new FormData(event.target);
      const response = await fetch("/api/admin", {
        method: "POST",
        body: JSON.stringify({ username: name, isAdmin: data.get("isAdmin") }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (!response.ok) {
        redirectToLogin(result);
        throw new Error(
          result.error || "Erreur lors de la récupération des données",
        );
      }
      setResult(result);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    if (router.query.name) {
      fetchUser();
    }
  }, [router.query.name, update]);

  return (
    <Layout>
      <Link href="/admin">Back to admin page</Link>
      <h1>{router.query.name}</h1>
      <div>
        {result.message || (error.message && `Error: ${error.message}`)}
      </div>
      {user.isAdmin ? (
        <h2>Admin</h2>
      ) : (
        <form onSubmit={onSubmit}>
          <label>Admin</label>
          <input type="checkbox" name="isAdmin" />
          <button type="submit">Change</button>
        </form>
      )}
      <h2>Allergies</h2>
      <ul>
        {allergies
          ? allergies.map((allergy, index) => (
              <li key={index}>
                {allergy.allergy} {allergy.isPrivate ? "Private" : "Public"}{" "}
                <button
                  onClick={() => {
                    handleRemove(allergy.allergy);
                  }}
                >
                  X
                </button>
              </li>
            ))
          : ""}
      </ul>
    </Layout>
  );
}
