const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.use("/images", express.static(path.join(__dirname, "uploads")));

app.post("/upload", async (req, res) => {
  const imageData = req.body.imageData;

  // Decode base64 image data
  const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  // Generate a unique filename
  const fileName = Date.now() + ".png";

  // Save the image file to disk
  fs.writeFile(path.join(__dirname, "uploads", fileName), buffer, (err) => {
    if (err) {
      console.error("Error saving image:", err);
      return res.status(500).send("Error saving image");
    }
    console.log("Image saved successfully:", fileName);
    res.send("Image uploaded and saved successfully!");
  });

  const fileURL = "http://localhost:8000/images/" + fileName;

  const url = await prisma.image.create({ data: { imageUrl:fileURL } });

  console.log("file url :: ", url);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
