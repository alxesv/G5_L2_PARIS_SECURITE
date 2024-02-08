import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

export default function Reset() {
  const [password, setPassword] = React.useState("");
  const [result, setResult] = React.useState({});
  const [error, setError] = React.useState({});
  const [isExpired, setIsExpired] = React.useState(false);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.token) {
      fetch("/api/verifyLinkReset?token=" + router.query.token)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              response.error || "Erreur lors de la récupération des données",
            );
          }
        })
        .catch((error) => {
          if (error.status === 401 || error.status === 403) {
            setIsExpired(true);
          } else {
            setError(error);
          }
        });
    }
    return () => {
      setPassword("");
      setIsUpdated(false);
      setIsExpired(false);
    };
  }, [router.query.token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPassword("");
    setError({});
    setResult({});
    try {
      const response = await fetch("/api/reset?token=" + router.query.token, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      setResult(result);
      if (!response.ok) {
        throw new Error(
          result.error || "Erreur lors de la récupération des données",
        );
      }
      setIsUpdated(true);
      setPassword("");
    } catch (error) {
      if (error.status === 401) {
        setIsExpired(true);
      } else {
        setIsExpired(true);
        setError(error);
      }
    }
  };
  return (
    <main>
      {isExpired ? (
        <div>
          Le lien a expiré <br />
          <Link href="/login">Revenir sur le site</Link>
        </div>
      ) : isUpdated ? (
        <section>
          <h1>Mot de passe réinitialiser</h1>
          <br />
          <div>
            Votre mot de passe a été réinitialiser. Veuillez vous reconnecter.
          </div>
          <br />
          <Link href="/login">Revenir à la page de connexion</Link>
        </section>
      ) : (
        <>
          <h1>Réinitialiser votre mot de passe</h1>
          <section>
            <div>
              {result.message || (error.message && `Error: ${error.message}`)}
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="reset-password">Password</label>
              <br />
              <input
                type="password"
                id="reset-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <button type="submit">Valider</button>
            </form>
          </section>
        </>
      )}
    </main>
  );
}
