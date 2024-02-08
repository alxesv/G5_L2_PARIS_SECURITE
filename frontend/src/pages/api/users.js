
export default async function handler(req, res) {

    try {
    if (req.method === 'GET') {
    
        const response = await fetch(process.env.backend_url + '/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req.cookies.accessToken}`,

            }
        })
        const data = await response.json()
        if (!response.ok) {
        const error = new Error(
              data.message ||
                "Erreur lors de la récupération des données depuis l'API",
            );
            error.status = response.status;
            if(data.invalid === true){
            error.invalid = data.invalid
            }
            throw error;
          }
        res.status(200).json(data)
    }else if (req.method === 'POST') {
        let params = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req.cookies.accessToken}`,

            }
        }
        if (req.body.username) {
            let username = req.body.username;
            params.body = JSON.stringify({ username: username });
        }
        const response = await fetch(process.env.backend_url + '/users', params)
        const data = await response.json()
        if (!response.ok) {
            const error = new Error(
              data.message ||
                "Erreur lors de la récupération des données depuis l'API",
            );
            if(data.invalid === true){
                error.invalid = data.invalid
                }
            error.status = response.status;
            throw error;
          }
        res.status(200).json(data)
    }
} catch (error) {
    console.error("Erreur lors de la récupération des données :", error.message);
    const jsonError = error.invalid ? {invalid: error.invalid } : {}
    return res.status(error.status || 500).json({...jsonError,
      error: error.message || "Erreur lors de la récupération des données",
    });
}
    }
