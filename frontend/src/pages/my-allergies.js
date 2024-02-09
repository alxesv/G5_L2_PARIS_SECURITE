import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@/utils/getCurrentUser";
import useRedirectTo from "@/utils/redirect";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { sanitizeString } from "@/utils/verification";

export default function MyAllergies() {
  const [allergies, setAllergies] = useState([]);
  const [error, setError] = React.useState({});
  const [update, setUpdate] = React.useState(false);
  const { redirectToLogin } = useRedirectTo();
  const router = useRouter();
  const reset = () => {
    setError({});
  };
  async function fetchUser() {
    reset();
    try {
      const name = document?.cookie
        ?.split("; ")
        ?.find((row) => row.startsWith("accessToken"))
        ?.split("=")[1];
      if (!name) {
        router.push("/login");
        return;
      }
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username: sanitizeString(getCurrentUser(name)?.username, "Nom") }),
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
      setAllergies(data.allergies);
    } catch (error) {
      setError(error);
    }
  }

  async function handleRemove(allergy) {
    reset();
    try {
      const name = document?.cookie
        ?.split("; ")
        ?.find((row) => row.startsWith("accessToken"))
        ?.split("=")[1];
      if (!name) {
        router.push("/login");
        return;
      }
      const response = await fetch("/api/remove", {
        method: "POST",
        body: JSON.stringify({
          username: sanitizeString(getCurrentUser(name)?.username, "Nom"),
          allergy: allergy,
        }),
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
      setAllergies(allergies.filter((allergy) => allergy.allergy !== allergy));
      setUpdate((prev) => !prev);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [update]);

  return (
    <Layout>
      <h1>My Allergies</h1>
      <div>{error.message && `Error: ${error.message}`}</div>
      <ul>
        {allergies && allergies.length > 0 ? (
          allergies.map((allergy, index) => (
            <li key={index}>
              {allergy.allergy} {allergy.isPrivate ? "Private" : "Public"}{" "}
              <button
                onClick={() => {
                  const sanitizedString = sanitizeString(allergy.allergy, "Allergie")
                  handleRemove(sanitizedString);
                }}
              >
                X
              </button>
            </li>
          ))
        ) : (
          <h2>No allergies</h2>
        )}
      </ul>
    </Layout>
  );
}
