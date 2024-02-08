import { useRouter } from "next/router";
import React from "react";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [result, setResult] = React.useState({});
  const [error, setError] = React.useState({});
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, mail }),
      });
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(
          result.error || "Erreur lors de la récupération des données",
        );
      }
      setResult(result);
      setUsername("");
      setPassword("");
      setMail("");
      router.push("/login");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <main>
      <h1>Register</h1>
      <section>
      <div>
          {result.message || (error.message && `Error: ${error.message}`)}
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="register-name">Name</label>
          <br />
          <input
            type="text"
            id="register-name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <label htmlFor="register-mail">E-mail</label>
          <br />
          <input
            type="text"
            id="register-mail"
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
          <br />
          <label htmlFor="register-password">Password</label>
          <br />
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button type="submit">Valider</button>
        </form>
      </section>
    </main>
  );
}
