import jwt from "jsonwebtoken";

const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        return null;
    }
};

export default function handler (req, res) {
  if (req.method == "GET") {
    const decoded = validateToken(req.headers.token);
    res.status(200).json(decoded);
  };
}
