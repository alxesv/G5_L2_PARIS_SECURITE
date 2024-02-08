export default async function handler(req, res) {
    try {
      const response = await fetch("http://localhost:3000/verifyLinkReset", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${req.query.token}`
        },
      });
      const result = await response.json();
      if (!response.ok) {
        if(response.status === 401){
        const error = new Error("Le lien a expiré !");
        throw error;

        }
        const error = new Error(result.message || 'Erreur lors de la récupération des données depuis l\'API');
        error.status = response.status;
        throw error;
      }
      res.status(200).json(result);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return res.status(error.status || 500).json({ error: error.message || 'Erreur lors de la récupération des données' });
     
    }
  }
  