const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Accès refusé. Token manquant." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Utilisateur authentifié :", decoded); // <-- ICI C’EST OK
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Token invalide :", err.message);
    res.status(403).json({ error: "Token invalide." });
  }
};
