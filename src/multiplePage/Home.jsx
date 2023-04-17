import React from "react";
import Navbar from "../component/navbar";
import Gallery from "../component/gallery.js";

function App() {
  const images = [
    "https://i.pinimg.com/736x/22/6a/f8/226af8c0028698fdb6543384f0db7e25--canard-a-lorange-gastro.jpg",
    "https://i.pinimg.com/736x/22/6a/f8/226af8c0028698fdb6543384f0db7e25--canard-a-lorange-gastro.jpg",
    "https://i.pinimg.com/736x/22/6a/f8/226af8c0028698fdb6543384f0db7e25--canard-a-lorange-gastro.jpg",
    "https://i.pinimg.com/736x/22/6a/f8/226af8c0028698fdb6543384f0db7e25--canard-a-lorange-gastro.jpg",
    "https://i.pinimg.com/736x/22/6a/f8/226af8c0028698fdb6543384f0db7e25--canard-a-lorange-gastro.jpg",
    "https://i.pinimg.com/736x/22/6a/f8/226af8c0028698fdb6543384f0db7e25--canard-a-lorange-gastro.jpg",
  ];

  return (
    <div>
      <div className="container">
        <h1 className="title_image">Le Quai Antique</h1>
      </div>
      <div>
        <h1>Menu du restaurant</h1>
        <Gallery images={images} />
      </div>
      <div className="reservation_container">
        <button>Réserver</button>
      </div>
    </div>
  );
}

export default App;
