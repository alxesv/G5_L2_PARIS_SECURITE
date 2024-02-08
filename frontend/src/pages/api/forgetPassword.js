export default async function handler(req, res) {
  try {
    const response = await fetch("http://localhost:3000/forgetPassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    if (!response.ok) {
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
