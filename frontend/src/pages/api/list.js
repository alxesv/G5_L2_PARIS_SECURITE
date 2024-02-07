export default async function handler(req, res) {
    const response = await fetch('http://localhost:3000/allergies',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    res.send(data);
  }