import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

export default function Identify() {
  const [mail, setMail] = React.useState("");
  const [result, setResult] = React.useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/forgetPassword", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail }),
      });

      const result = await response.json();
      setResult(result);
      if (!response.ok) {
        return;
      }
      setMail("");
    } catch (error) {
      setResult(error);
    }
  };
  return (
    <main>
      <h1>Entrer votre mail</h1>
      <section>
        <div>{result.message}</div>
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
    </main>
  );
}
