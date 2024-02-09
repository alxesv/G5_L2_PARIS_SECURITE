import Layout from "@/components/layout";
import logout from "@/utils/logout";
import {  sanitizeString } from "@/utils/verification";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [result, setResult] = React.useState({});
  const [error, setError] = React.useState({});
  const router = useRouter();
  React.useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      logout();
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sanitizedString = sanitizeString(username, "Nom")
      const sanitizedPassword =sanitizeString(password, "Mot de passe")
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: sanitizedString, password : sanitizedPassword}),
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
      router.push("/");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <Layout>
      <h1>Login</h1>
      <section>
        <div>
          {result.message || (error.message && `Error: ${error.message}`)}
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="login-name">Name</label>
          <br />
          <input
            type="text"
            id="login-name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <label htmlFor="name">Password</label>
          <br />
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <Link href="/login/identify">Mot de passe oublié ?</Link>
          <br />
          <button type="submit">Valider</button>
        </form>
      </section>
    </Layout>
  );
}
