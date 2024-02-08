export default async function handler(req, res) {
  try {
    
    const backendUrl = process.env.backend_url + '/register';
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
