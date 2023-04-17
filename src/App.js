import React from "react";
import Navbar from "./component/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./multiplePage/Home";
import Menu from "./multiplePage/Menu";
import Reservation from "./multiplePage/reservation";
import Contact from "./multiplePage/contact";

function App() {
  return (
    <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
