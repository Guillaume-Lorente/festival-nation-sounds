import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/account");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur inconnue");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/account");
    } catch (err) {
      setError("Erreur réseau ou serveur");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl text-blue-700 font-bold mb-6 text-center">Connexion à votre compte</h1>

      {error && (
        <p
          className="text-red-600 mb-4"
          role="alert"
          id="login-error"
        >
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
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined}
            autoComplete="email"
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
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined}
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Se connecter
        </button>

        <p className="mt-2 text-sm text-center">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Créez-en un ici
          </Link>
        </p>
      </form>
    </div>
  );
}
