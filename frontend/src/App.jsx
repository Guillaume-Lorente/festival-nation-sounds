import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Lineup from "./pages/Lineup";
import Account from "./pages/Account";
import Header from "./components/Header";
import Home from "./pages/Home";
import ArtistDetail from "./pages/ArtistDetail";
import Tickets from "./pages/Tickets";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/lineup" element={<Lineup />} />
        <Route path="/artist/:id" element={<ArtistDetail />} />
        <Route path="/tickets" element={<Tickets />} />
      </Routes>
    </Router>
  );
}

export default App;
