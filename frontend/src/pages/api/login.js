import { setCookie } from "cookies-next";
export default async function handler(req, res) {
  try {
    const response = await fetch(process.env.backend_url + '/login', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    if (!response.ok)
      return res.status(401).json({ message: response.statusText });
    setCookie("accessToken", result.accessToken, {
      req,
      res,
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });
    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
}
