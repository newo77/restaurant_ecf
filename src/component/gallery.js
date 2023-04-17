import React from 'react';

const Gallery = ({ images }) => {
    
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <div key={index} className="gallery-item">
          <img src={image} alt={`Plat ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;