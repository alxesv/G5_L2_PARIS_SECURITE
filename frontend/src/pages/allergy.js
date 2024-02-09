import Layout from "@/components/layout";
import useRedirectTo from "@/utils/redirect";
import { sanitizeString } from "@/utils/verification";
import React from "react";

export default function Allergy() {
  const [error, setError] = React.useState({});
  const [result, setResult] = React.useState({});
  const { redirectToLogin } = useRedirectTo();

  const reset = () => {
    setError({});
    setResult({});
  };
  async function onSubmit(event) {
    event.preventDefault();
    reset();
    try {
      const formData = {};
      const form = event.target;
      const data = new FormData(form);
      data.forEach((value, key) => {
        formData[key] = value;
      });
      const sanitizedString =  sanitizeString(formData.allergy, "Allergie")
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify({...formData, allergy: sanitizedString}),
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

  return (
    <Layout>
      <h1>Add an allergy</h1>
      <div>
        {result.message || (error.message && `Error: ${error.message}`)}
      </div>
      <br />
      <form onSubmit={onSubmit}>
        <label>Allergy :</label>
        <input type="text" name="allergy" />
        <label>Private ? :</label>
        <input type="checkbox" name="isPrivate" />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}

