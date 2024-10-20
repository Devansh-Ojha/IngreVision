import { useState } from "react";
import heic2any from "heic2any";
import "./ImageUpload.css";
import { parseRecipe } from "../utils/recipeParser";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: [],
    instructions: [],
    tips: [],
  });
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setRecipeData({
      title: "",
      ingredients: [],
      instructions: [],
      tips: [],
    });
    setLoading(false);
  };

  const handleFileChange = async (event) => {
    resetState(); // Reset the state when a new file is chosen
    const file = event.target.files[0];
    if (file) {
      if (file.type === "image/heic" || file.type === "image/heif") {
        try {
          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
          });
          const objectUrl = URL.createObjectURL(convertedBlob);
          setPreviewUrl(objectUrl);
          setSelectedFile(convertedBlob);
        } catch (error) {
          console.error("Error converting HEIC:", error);
        }
      } else {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setSelectedFile(file);
      }
    }
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
      const parsedRecipe = parseRecipe(data.recipe);
      setRecipeData(parsedRecipe);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Recipe Generator</h1>
      <div className="upload-section">
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          onClick={resetState}
          accept=".jpg,.jpeg,.png,.heic,.heif"
        />
        <button onClick={handleUpload} className="upload-btn">
          Upload and Generate Recipe
        </button>
        {loading && <p className="loading">Loading...</p>}
      </div>

      {previewUrl && (
        <div className="recipe-section">
          <div className="image-preview">
            <h3>Selected Image</h3>
            <img src={previewUrl} alt="Selected" className="uploaded-image" />
          </div>

          {recipeData.title && (
            <div className="recipe-card">
              <h2 className="recipe-title">{recipeData.title}</h2>
              <div className="recipe-content">
                <h3>Ingredients:</h3>
                <ul className="ingredients-list">
                  {recipeData.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h3>Instructions:</h3>
                <ol className="instructions-list">
                  {recipeData.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
                {recipeData.tips.length > 0 && (
                  <>
                    <h3>Tips:</h3>
                    <ul className="tips-list">
                      {recipeData.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
