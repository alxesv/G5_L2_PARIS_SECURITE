import React from "react";
import Link from "next/link";
import Layout from "@/components/layout";
import { sanitizeEmail } from "@/utils/verification";

export default function Identify() {
  const [mail, setMail] = React.useState("");
  const [result, setResult] = React.useState({});
  const [error, setError] = React.useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sanitizedEmail = sanitizeEmail(mail)
      const response = await fetch("/api/forgetPassword", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail: sanitizedEmail }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.error || "Erreur lors de la récupération des données",
        );
      }  
      setResult(result);
      setMail("");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <Layout>
      <h1>Entrer votre mail</h1>
      <section>
      <div>
        {result.message || (error.message && `Error: ${error.message}`)}
      </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="identify-mail">E-mail</label>
          <br />
          <input
            type="text"
            id="identify-mail"
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
          <br />

          <Link href="/login">Revenir à la page de connexion</Link>
          <button type="submit">Valider</button>
        </form>
      </section>
    </Layout>
  );
}
