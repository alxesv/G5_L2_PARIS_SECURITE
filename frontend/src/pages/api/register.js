import { sanitizeEmail, sanitizePassword, sanitizeString } from "@/utils/verification";

export default async function handler(req, res) {
  try {
    const {username, password, mail} = req.body
    const sanitizedPassword = sanitizePassword(password)
    const sanitizedUsername =  sanitizeString(username, 'Nom')
    const sanitizedEmail = sanitizeEmail(mail)

    const response = await fetch(process.env.backend_url + "/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: sanitizedUsername, password: sanitizedPassword, mail: sanitizedEmail }),
    });
    const result = await response.json();

    if (!response.ok) {
      const error = new Error(
        result.message ||
          "Erreur lors de la récupération des données depuis l'API",
      );
      error.status = response.status;
      throw error;
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error.message);
    return res.status(error.status || 500).json({
      error: error.message || "Erreur lors de la récupération des données",
    });
  }
}
