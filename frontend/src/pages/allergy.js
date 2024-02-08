import Layout from "@/components/layout";
import useRedirectTo from "@/utils/redirect";
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
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(formData),
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

export async function getServerSideProps(context) {
  const { req, res } = context;
  if (!req.cookies.accessToken) {
    // Redirigez l'utilisateur vers une page d'erreur ou une page de connexion
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }
  return {
    props: {}, // Les propriétés de la page
  };
}
