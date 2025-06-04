import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecaptchaWrapper from "../components/RecaptchaWrapper"; // <-- important

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/account");
  }, [navigate]);

  const isStrongPassword = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_.,;:])[A-Za-z\d@$!%*?#&_.,;:]{8,}$/;
    return strongRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isStrongPassword(password)) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole."
      );
      return;
    }

    if (!recaptchaToken) {
      setError("Veuillez valider le reCAPTCHA.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, recaptchaToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de l'inscription");
        return;
      }

      navigate("/login");
    } catch (err) {
      setError("Erreur réseau ou serveur");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Créer un compte</h1>

      {error && (
        <p className="text-red-600 mb-4" role="alert" id="register-error">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-invalid={!!error}
            aria-describedby={error ? "register-error" : undefined}
          />
        </div>

        <div>
          <label htmlFor="username" className="block font-medium mb-1">
            Nom d'utilisateur
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="w-full border rounded p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            aria-invalid={!!error}
            aria-describedby={error ? "register-error" : undefined}
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            aria-invalid={!!error}
            aria-describedby={error ? "register-error" : undefined}
          />
        </div>

        <RecaptchaWrapper onTokenChange={setRecaptchaToken} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}
