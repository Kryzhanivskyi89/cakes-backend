const mongoose = require('mongoose');

// Опис продукту
const gallerySchema = new mongoose.Schema({
    title: { type: String, required: false },
    alt: { type: String, required: false },
    description: { type: String, required: false },
    category: { type: String, required: true }, // Додаємо категорію
    photos: {
        deskPhoto: { type: String, required: true },
        deskPhoto2x: { type: String, required: true },
        tabPhoto: { type: String, required: true },
        tabPhoto2x: { type: String, required: true },
        mobPhoto: { type: String, required: true },
        mobPhoto2x: { type: String, required: true },
    },
});

// Створення моделі продукту
const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;