import { useEffect, useState } from "react";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (accepted) => {
    localStorage.setItem("cookieConsent", accepted ? "true" : "false");
    setShowBanner(false);
    if (accepted) {
      loadAnalyticsScripts();
    }
  };

  const loadAnalyticsScripts = () => {
    // Exemple pour Google Analytics
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-XXXXXXX");
    };
  };

  return (
    showBanner && (
      <div style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#222",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
        zIndex: 1000
      }}>
        Ce site utilise des cookies pour améliorer votre expérience.
        <button onClick={() => handleConsent(true)} style={{ margin: "0 0.5rem" }}>
          Accepter
        </button>
        <button onClick={() => handleConsent(false)} style={{ margin: "0 0.5rem" }}>
          Refuser
        </button>
        <a href="/politique-cookies" style={{ color: "#ccc", marginLeft: "1rem" }}>
          En savoir plus
        </a>
      </div>
    )
  );
};

export default CookieBanner;
