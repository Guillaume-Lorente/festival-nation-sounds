import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

export default function ArtistCard({ artist, linkToDetail = true }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-4 border rounded shadow flex justify-between items-center">
      <div>
        {linkToDetail ? (
          <Link
            to={`/artists/${artist.id}`}
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            {artist.name}
          </Link>
        ) : (
          <p className="text-lg font-semibold">{artist.name}</p>
        )}
        {artist.genre && <p className="text-sm text-gray-600">{artist.genre}</p>}
      </div>

      {user && (
        <FavoriteButton artistId={artist.id} />
      )}
    </div>
  );
}