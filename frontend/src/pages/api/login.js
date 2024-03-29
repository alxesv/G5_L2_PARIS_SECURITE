import {  sanitizeString } from "@/utils/verification";
import { setCookie } from "cookies-next";
export default async function handler(req, res) {
  try {
    const {username, password} = req.body
    const sanitizedPassword = sanitizeString(password, "Mot de passe")
    const sanitizedUsername =  sanitizeString(username, 'Nom')
    const response = await fetch(process.env.backend_url + "/login", {
      method: "POST",
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: sanitizedUsername, password: sanitizedPassword }),
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
    setCookie("accessToken", result.accessToken, {
      req,
      res,
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });
    setCookie("XSRF-TOKEN", result.xsrfToken, {
      req,
      res,
      httpOnly: true, secure:true,
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error.message);
    return res.status(error.status || 500).json({
      error: error.message || "Erreur lors de la récupération des données",
    });
  }
}
