import ReCAPTCHA from "react-google-recaptcha";

export default function RecaptchaWrapper({ onTokenChange }) {
  const handleChange = (token) => {
    onTokenChange(token);
  };

  return (
    <div className="my-4">
      <ReCAPTCHA
        sitekey="6LeC3VUrAAAAAAnYAVWQRdRBqsjSf8Z5MslxRg17"
        onChange={handleChange}
      />
    </div>
  );
}