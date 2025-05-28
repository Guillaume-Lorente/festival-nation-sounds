export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center mt-10">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Nation Sounds. Tous droits réservés.
      </p>
      <p className="text-xs text-gray-400 mt-1">Projet fictif – Démo scolaire</p>
    </footer>
  );
}