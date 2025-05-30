import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaSpotify} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-yellow-200 py-4 text-center mt-10">
      <span className='flex justify-center text-3xl gap-5 px-4 py-3'>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className='hover:text-blue-300 duration-300'>
        <FaFacebook />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className='hover:text-blue-300 duration-300'>
        <FaTwitter />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className='hover:text-blue-300 duration-300'>
        <FaInstagram />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className='hover:text-blue-300 duration-300'>
        <FaLinkedin />
      </a>
      <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className='hover:text-blue-300 duration-300'>
        <FaSpotify />
      </a>
      </span>
      <span className ="flex justify-center text-xl gap-5 px-4 py-3">
          <a href="#" target="_blank" className="hover:text-blue-300 duration-300">FAQ</a>| 
          <a href="#" target="_blank" className="hover:text-blue-300 duration-300">Contact</a>| 
          <a href="#" target="_blank" className="hover:text-blue-300 duration-300">Nos partenaires</a>| 
          <a href="#" target="_blank" className="hover:text-blue-300 duration-300">Mentions Légales</a>
      </span>
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Nation Sounds. Tous droits réservés.
      </p>
      <p className="text-xs text-gray-400 mt-1">Projet fictif – Démo scolaire</p>
    </footer>
  );
}