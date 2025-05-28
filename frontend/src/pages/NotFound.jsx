export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">404</h2>
      <p className="text-lg">Oups, cette page n’existe pas.</p>
      <p className="mt-2 text-sm text-gray-500">Vérifie l’URL ou retourne à l’accueil.</p>
    </div>
  );
}