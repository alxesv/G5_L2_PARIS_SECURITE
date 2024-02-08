export default async function handler(req, res) {
    if (req.method === 'GET') {
        const response = await fetch(process.env.backend_url + '/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        res.send(data)
    }else if (req.method === 'POST') {
        let params = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        if (req.body.username) {
            let username = req.body.username;
            params.body = JSON.stringify({ username: username });
        }
        const response = await fetch(process.env.backend_url + '/users', params)
        const data = await response.json()
        res.send(data)
    }
    }
