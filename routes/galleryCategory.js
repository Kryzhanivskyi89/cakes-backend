
// const express = require('express');
// const Gallery = require('../models/gallery');
// const { fetchCloudinaryImages } = require('../services/api');

// const router = express.Router();

// // POST: Створити новий продукт вручну
// router.post('/', async (req, res) => {
//     const { title, alt, description, category, photos } = req.body;

//     const newGallery = new Gallery({
//         title,
//         alt,
//         description,
//         category,
//         photos,
//     });

//     try {
//         const savedGallery = await newGallery.save();
//         res.status(201).json(savedGallery);
//     } catch (error) {
//         res.status(500).json({ message: "Не вдалося зберегти продукт", error: error.message });
//     }
// });

// // GET: Отримати продукти по категорії
// router.get('/:category', async (req, res) => {
//     const { category } = req.params;

//     try {
//         const products = await Gallery.find({ category });
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: "Не вдалося отримати продукти", error: error.message });
//     }
// });

// // POST: Синхронізувати зображення з Cloudinary для категорії
// router.post('/sync/:category', async (req, res) => {
//     const { category } = req.params;

//     try {
//         // Отримуємо зображення з Cloudinary
//         const images = await fetchCloudinaryImages(category);

//         // Групуємо зображення за номером продукту
//         const groupedImages = images.reduce((acc, img) => {
//             const match = img.public_id.match(/(\d+)(desk|tab|mob)_(1x|2x)/);
//             if (match) {
//                 const [_, productNumber, type, resolution] = match;

//                 if (!acc[productNumber]) {
//                     acc[productNumber] = { desk: {}, tab: {}, mob: {} };
//                 }

//                 acc[productNumber][type][resolution] = img.url;
//             }
//             return acc;
//         }, {});

//         // Додаємо нові продукти в базу
//         for (const [productNumber, photos] of Object.entries(groupedImages)) {
//             const existingProduct = await Gallery.findOne({
//                 category,
//                 "photos.deskPhoto": photos.desk["1x"],
//             });

//             if (!existingProduct) {
//                 const newProduct = new Gallery({
//                     title: `Продукт ${productNumber}`,
//                     alt: `Опис продукту ${productNumber}`,
//                     description: "",
//                     category,
//                     photos: {
//                         deskPhoto: photos.desk["1x"] || "",
//                         deskPhoto2x: photos.desk["2x"] || "",
//                         tabPhoto: photos.tab["1x"] || "",
//                         tabPhoto2x: photos.tab["2x"] || "",
//                         mobPhoto: photos.mob["1x"] || "",
//                         mobPhoto2x: photos.mob["2x"] || "",
//                     },
//                 });

//                 await newProduct.save();
//                 console.log(`Додано продукт ${productNumber} у категорію ${category}`);
//             }
//         }

//         res.status(200).json({ message: `Синхронізація категорії ${category} завершена.` });
//     } catch (error) {
//         console.error("Помилка синхронізації:", error.message);
//         res.status(500).json({ message: "Помилка синхронізації", error: error.message });
//     }
// });

// module.exports = router;

// // const express = require('express');
// // const Gallery = require('../models/gallery');

// // const router = express.Router();

// // // POST: Створити новий продукт
// // router.post('/', async (req, res) => {
// //     const { title, alt, description, category, photos } = req.body;

// //     // Створюємо новий продукт в базі даних
// //     const newGallery = new Gallery({
// //         title,
// //         alt,
// //         description,
// //         category,
// //         photos
// //     });

// //     try {
// //         const savedGallery = await newGallery.save();
// //         res.status(201).json(savedGallery); // Відправляємо збережений продукт
// //     } catch (error) {
// //         res.status(500).json({ message: "Не вдалося зберегти продукт", error: error.message });
// //     }
// // });

// // // GET: Отримати продукти по категорії
// // router.get('/:category', async (req, res) => {
// //     const { category } = req.params;

// //     try {
// //         const products = await Gallery.find({ category }); // Отримуємо продукти за категорією
// //         res.json(products); // Відправляємо продукти
// //     } catch (error) {
// //         res.status(500).json({ message: "Не вдалося отримати продукти", error: error.message });
// //     }
// // });

// // module.exports = router;