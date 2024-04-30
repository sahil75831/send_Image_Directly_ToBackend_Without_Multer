import React, { useState } from "react";

const Appp = () => {
  const [imageData, setImageData] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageData(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageData }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to upload image");
        }
        console.log("Image uploaded successfully!");
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
      });
  };
  return (
    <div>
      <h1>Sending file to backend without using multer</h1>
      <br />
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <hr />
        <button style={{ padding: "2rem" }} type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Appp;
