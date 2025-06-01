import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path="/lineup" element={<Lineup />} />
        <Route path="/map" element={<Map />} />
        <Route path="/artist/:id" element={<ArtistDetail />} />
        <Route path="/infos" element={<InfosPratiques />} />
        <Route path="/partners" element={<Partenaires />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
