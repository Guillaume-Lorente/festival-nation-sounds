import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminManageArtists from "./pages/AdminManageArtists";
import AdminManageEvents from "./pages/AdminManageEvents";
import AdminManageMapAreas from "./pages/AdminManageMapAreas";
import AdminAddArtist from "./pages/AdminAddArtist";
import AdminEditArtist from "./pages/AdminEditArtist";
import AdminAddEvent from "./pages/AdminAddEvent";
import AdminEditEvent from "./pages/AdminEditEvent";
import AdminAddMapArea from "./pages/AdminAddMapArea";
import AdminEditMapArea from "./pages/AdminEditMapArea";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import Lineup from "./pages/Lineup";
import Account from "./pages/Account";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ArtistDetail from "./pages/ArtistDetail";
import Tickets from "./pages/Tickets";
import PrivateRoute from "./components/PrivateRoute";
import Map from "./pages/Map";
import Cart from "./pages/Cart";
import InfosPratiques from "./pages/Informations";
import Partenaires from "./pages/Partners";
import MentionsLegales from "./pages/legalnotices";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lineup" element={<Lineup />} />
        <Route path="/map" element={<Map />} />
        <Route path="/artist/:id" element={<ArtistDetail />} />
        <Route path="/infos" element={<InfosPratiques />} />
        <Route path="/partners" element={<Partenaires />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/legalnotices" element={<MentionsLegales />} />
        <Route path="/contact" element={<Contact />} />

        {/* Routes utilisateur privé */}
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />

        {/* Routes admin privées */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateAdminRoute>
              <AdminDashboard />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/artists"
          element={
            <PrivateAdminRoute>
              <AdminManageArtists />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/add-artist"
          element={
            <PrivateAdminRoute>
              <AdminAddArtist />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/artists/:id"
          element={
            <PrivateAdminRoute>
              <AdminEditArtist />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <PrivateAdminRoute>
              <AdminManageEvents />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/add-event"
          element={
            <PrivateAdminRoute>
              <AdminAddEvent />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/events/:id"
          element={
            <PrivateAdminRoute>
              <AdminEditEvent />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/map-areas"
          element={
            <PrivateAdminRoute>
              <AdminManageMapAreas />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/add-map-area"
          element={
            <PrivateAdminRoute>
              <AdminAddMapArea />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/map-areas/:id"
          element={
            <PrivateAdminRoute>
              <AdminEditMapArea />
            </PrivateAdminRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      <Footer />
      </div>
    </Router>
  );
}

export default App;