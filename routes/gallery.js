
const express = require("express");
const router = express.Router();
const { fetchCloudinaryImages } = require("../services/api");
const Gallery = require("../models/gallery");
const galleryControllers = require("../controlers/gallery")

router.get("/sync/:folder", galleryControllers.syncGallery)

router.get("/:category", galleryControllers.getCategory)

module.exports = router;
