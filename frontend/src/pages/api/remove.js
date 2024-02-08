export default async function handler(req, res) {
    const data = req.body
    const response = await fetch(process.env.backend_url + '/remove', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
        })
    res.send(response)
  }