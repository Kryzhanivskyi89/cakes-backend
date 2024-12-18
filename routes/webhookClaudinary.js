const express = require("express");
const crypto = require("crypto");
const { fetchCloudinaryImages } = require("../services/api");
const Gallery = require("../models/gallery");

const router = express.Router();

function verifySignature(payload, signature, apiSecret) {
  const hash = crypto
    .createHash("sha256")
    .update(payload + apiSecret)
    .digest("hex");
  return hash === signature;
}

router.post("/sync-webhook", async (req, res) => {
  const { folder } = req.body;

  try {
    const payload = JSON.stringify(req.body);
    const signature = req.headers["x-cld-signature"];
    const apiSecret = process.env.API_SECRET;
    console.log("Payload:", payload);
    console.log("Signature from Cloudinary:", signature);
    if (!verifySignature(payload, signature, apiSecret)) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    if (!folder) {
      return res.status(400).json({ message: "Folder name is required" });
    }

    const images = await fetchCloudinaryImages(folder);

    for (const image of images) {
      const { url, public_id } = image;

      const existingProduct = await Gallery.findOne({ "photos.deskPhoto": url });
      if (!existingProduct) {
        await Gallery.create({
          title: `Product ${public_id}`,
          alt: `Alt text for ${public_id}`,
          description: "Auto-generated description",
          category: folder,
          photos: {
            deskPhoto: url,
            deskPhoto2x: "",
            tabPhoto: "",
            tabPhoto2x: "",
            mobPhoto: "",
            mobPhoto2x: "",
          },
        });
      }
    }

    res.status(200).json({ message: "Synchronization completed" });
  } catch (error) {
    console.error("Помилка вебхука:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;