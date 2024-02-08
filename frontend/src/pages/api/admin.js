export default async function handler(req, res) {

    try {
    const data = req.body
    
    const response = await fetch(process.env.backend_url + '/admin', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.cookies.accessToken}`,
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
    res.status(200).json(result);

 } catch (error) {
    console.error("Erreur lors de la récupération des données :", error.message);
    const jsonError = error.invalid ? {invalid: error.invalid } : {}
    return res.status(error.status || 500).json({...jsonError,
      error: error.message || "Erreur lors de la récupération des données",
    });
    }
  }