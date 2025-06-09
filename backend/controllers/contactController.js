const axios = require("axios");

exports.submitContactForm = async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;

  if (!name || !email || !message || !recaptchaToken) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  // Vérifier le token reCAPTCHA
  try {
    const verification = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      }
    );

    if (!verification.data.success) {
      return res
        .status(400)
        .json({ error: "Échec de la vérification reCAPTCHA." });
    }
  } catch (err) {
    console.error("Erreur reCAPTCHA :", err.message);
    return res
      .status(500)
      .json({ error: "Erreur lors de la vérification reCAPTCHA." });
  }

  console.log("📨 Nouveau message contact :", { name, email, message });

  return res
    .status(200)
    .json({ message: "Message reçu. Merci pour votre contact !" });
};
