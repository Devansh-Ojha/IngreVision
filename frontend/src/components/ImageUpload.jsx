import React, { useState } from "react";
import "./ImageUpload.css";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("API Response:", data);
      setRecipe(data.recipe);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Upload Food Image to Get Recipe</h1>
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={handleUpload} className="upload-btn">
          Upload and Get Recipe
        </button>
        {loading && <p>Loading...</p>} {/* Show loading state */}
      </div>

      {/* Display the generated recipe */}
      {recipe && (
        <div className="recipe-card">
          <h2>Generated Recipe</h2>
          <p>{recipe}</p>
          {console.log("Rendering Recipe:", recipe)} {/* Log rendering */}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
