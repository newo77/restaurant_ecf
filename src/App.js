import React, { useState } from "react";
import Navbar from "./component/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./multiplePage/Home";
import Menu from "./multiplePage/Menu";
import Reservation from "./multiplePage/reservation";
import Contact from "./multiplePage/contact";
import Connexion from "./multiplePage/connexion";
import Inscription from "./multiplePage/inscription";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<Connexion setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/inscription" element={<Inscription />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
