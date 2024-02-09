import { sanitizePassword } from "@/utils/verification";
import validator from "validator";

export default async function handler(req, res) {
  try {
    const {password} =req.body
    const sanitizedPassword = sanitizePassword(password)
    const accessToken = validator.isJWT(req.query.token) && req.query.token

    const response = await fetch(process.env.backend_url + "/reset", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({password: sanitizedPassword}),
    });
    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        const error = new Error("Le lien a expiré !");
        error.status = response.status;
        throw error;
      }
      const error = new Error(
        result.message ||
          "Erreur lors de la récupération des données depuis l'API",
      );
      error.status = response.status;
      throw error;
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données :",
      error.message,
    );
    return res.status(error.status || 500).json({
      error: error.message || "Erreur lors de la récupération des données",
    });
  }
}
