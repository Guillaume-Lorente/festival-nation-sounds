import ReCAPTCHA from "react-google-recaptcha";

export default function RecaptchaWrapper({ onTokenChange }) {
  const handleChange = (token) => {
    onTokenChange(token);
  };

  return (
    <div className="my-4">
      <ReCAPTCHA
        sitekey="6LcHPVwrAAAAAC0Lb1pHTLU8jhFhZk4OpF7OHBbg"
        onChange={handleChange}
      />
    </div>
  );
}