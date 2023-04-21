import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:3001/images");
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleAddImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("title", imageTitle);
      formData.append("nom_du_fichier", imageFile.name);
      formData.append("url_du_fichier", imageUrl);
      const res = await axios.post("http://localhost:3001/images", formData);
      setImages([...images, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("title", imageTitle);
      formData.append("nom_du_fichier", imageFile.name);
      formData.append("url_du_fichier", imageUrl);
      const res = await axios.put(`/images/${selectedImage.id}`, formData);
      setImages(
        images.map((image) => (image.id === res.data.id ? res.data : image))
      );
      setSelectedImage(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteImage = async () => {
    try {
      await axios.delete(`http://localhost:3001/images/${selectedImage.id}`);
      setImages(images.filter((image) => image.id !== selectedImage.id));
      setSelectedImage(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Gallery</h1>
      <div>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url_du_fichier}
            alt={image.title}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
      {selectedImage && (
        <div>
          <h2>Selected Image</h2>
          <img src={selectedImage.url_du_fichier} alt={selectedImage.title} />
          <input
            type="text"
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {selectedImage.id ? (
            <div>
              <button onClick={handleUpdateImage}>Update</button>
              <button onClick={handleDeleteImage}>Delete</button>
            </div>
          ) : (
            <button onClick={handleAddImage}>Add</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
