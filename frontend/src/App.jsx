import { useState } from "react";
import "./App.css";
import React from "react";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <div>
      <h1>Food Recognition App</h1>
      <ImageUpload />
    </div>
  );
}

export default App;
