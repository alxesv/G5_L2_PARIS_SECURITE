import { sanitizeString } from "@/utils/verification";
import validator from "validator";

export default async function handler(req, res) {
    try {    
    const {allergy, username} = req.body
    const sanitizedUsername =  sanitizeString(username, 'Nom')
    const sanitizedAllergy =  sanitizeString(allergy, 'Allergie')
    const accessToken = validator.isJWT(req.cookies.accessToken) && req.cookies.accessToken

    const response = await fetch(process.env.backend_url + '/remove', {
        method: 'POST',
        body: JSON.stringify({username:sanitizedUsername, allergy: sanitizedAllergy}),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
        })
    const result = await response.json();

        if (!response.ok) {
      const error = new Error(
              result.message ||
                "Erreur lors de la récupération des données depuis l'API",
            );
            if ( result.invalid === true) { 
              error.invalid = result.invalid
              }
            error.status = response.status;
            throw error;
          }
    res.status(200).json(result)
     } catch (error) {
      console.error("Erreur lors de la récupération des données :", error.message);
      const jsonError = error.invalid ? {invalid: error.invalid } : {}
      return res.status(error.status || 500).json({...jsonError,
        error: error.message || "Erreur lors de la récupération des données",
      });
    }
  }