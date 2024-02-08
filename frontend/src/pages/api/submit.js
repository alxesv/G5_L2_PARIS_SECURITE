export default async function handler(req, res) {
    const data = req.body
    const response = await fetch('http://backend:3000/submit', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${req.cookies.accessToken}`
        }
        })
    res.send(response)
  }