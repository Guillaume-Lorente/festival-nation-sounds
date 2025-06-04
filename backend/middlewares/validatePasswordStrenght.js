module.exports = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Le mot de passe est requis." });
  }

  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_.,;:])[A-Za-z\d@$!%*?#&_.,;:]{8,}$/;

  if (!strongRegex.test(password)) {
    return res.status(400).json({
      error:
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole.",
    });
  }

  next();
};
