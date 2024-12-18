
const express = require("express");
const { fetchCloudinaryImages } = require("../services/api");
const Gallery = require("../models/gallery"); // Модель для роботи з базою даних
const router = express.Router();

// GET: Синхронізувати фото з Cloudinary і додати нові продукти в базу
router.get("/sync/:folder", async (req, res) => {
  const folderName = req.params.folder;

  try {
    // Отримуємо зображення з Cloudinary
    const images = await fetchCloudinaryImages(folderName);

    // Перевіряємо, чи є вже продукти в базі для цієї категорії
    const existingProducts = await Gallery.find({ category: folderName });

    // Групуємо нові зображення за типами
    const groupedImages = images.reduce((acc, img) => {
      const match = img.public_id.match(/(\d+)(desk|tab|mob)_(1x|2x)/);
      if (match) {
        const [_, productId, type, resolution] = match;
        const index = parseInt(productId, 10);

        if (!acc[index]) acc[index] = {};
        if (!acc[index][type]) acc[index][type] = {};
        acc[index][type][resolution] = img.url;
      }
      return acc;
    }, {});

    // Створюємо нові продукти
    const newProducts = Object.entries(groupedImages).map(([index, photos]) => ({
      title: `Product ${index}`, // Тимчасовий заголовок, можна змінити вручну пізніше
      alt: `Product ${index} description`, // Тимчасовий alt
      description: `Description for Product ${index}`, // Тимчасовий опис
      category: folderName,
      photos: {
        deskPhoto: photos.desk?.["1x"] || "",
        deskPhoto2x: photos.desk?.["2x"] || "",
        tabPhoto: photos.tab?.["1x"] || "",
        tabPhoto2x: photos.tab?.["2x"] || "",
        mobPhoto: photos.mob?.["1x"] || "",
        mobPhoto2x: photos.mob?.["2x"] || "",
      },
    }));

    // Фільтруємо, щоб уникнути дублювання
    const productsToAdd = newProducts.filter((product) => 
      !existingProducts.some(
        (existing) =>
          existing.category === product.category &&
          existing.photos.deskPhoto === product.photos.deskPhoto
      )
    );

    // Додаємо нові продукти в базу даних
    if (productsToAdd.length > 0) {
      await Gallery.insertMany(productsToAdd);
    }

    res.status(201).json({ message: "Синхронізація завершена", newProducts: productsToAdd });
  } catch (error) {
    res.status(500).json({ message: "Помилка при синхронізації", error: error.message });
  }
});

// GET: Отримати всі продукти по категорії
router.get("/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Gallery.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні продуктів", error: error.message });
  }
});

module.exports = router;
// const express = require("express");
// const { fetchCloudinaryImages } = require("../services/api");
// const router = express.Router();

// // Дані про продукти (без змін)
// const productDescriptions = {
//   cakes: [
//     { id: 1, title: "Cupcake 1", alt: "Смачний капкейк 1", description: "Найсмачніший капкейк у світі" },
//     { id: 2, title: "Cupcake 2", alt: "Смачний капкейк 2", description: "Солодкий і ніжний" },
//     { id: 3, title: "Cupcake 3", alt: "Смачний капкейк 2", description: "Солодкий і ніжний" },
//     { id: 4, title: "Cupcake 4", alt: "Смачний капкейк 2", description: "Солодкий і ніжний" },
//     { id: 5, title: "Cupcake 5", alt: "Смачний капкейк 2", description: "Солодкий і ніжний" },
//   ],
// };

// router.get("/:folder", async (req, res) => {
//   const folderName = req.params.folder;
//   const descriptions = productDescriptions[folderName];
  
//   if (!descriptions) {
//     return res.status(404).json({ message: "Категорія не знайдена" });
//   }

//   try {
//     const images = await fetchCloudinaryImages(folderName);

//     const products = descriptions.map((desc, index) => {
//       const productNumber = index + 1;
      
//       // Точний пошук зображень для конкретного продукту
//       const productImagesFilter = images.filter(img => {
//         const publicId = img.public_id;
//         // Перевіряємо, чи збігається повний формат публік айді
//         const regex = new RegExp(`^${productNumber}(desk|tab|mob)_(1x|2x)`);
//         return regex.test(publicId);
//       });
//       console.log(`Зображення для продукту ${productNumber}:`, productImagesFilter.map(img => img.public_id)); // Додаткова діагностика

//       // Групування знайдених зображень
//       const groupedImages = productImagesFilter.reduce((acc, img) => {
//         const parts = img.public_id.split('_');
//         const type = parts[0].replace(`${productNumber}`, '');
//         const resolution = parts[1];

//         if (!acc[type]) acc[type] = {};
//         acc[type][resolution] = img.url;

//         return acc;
//       }, {});

//       return {
//         ...desc,
//         photos: {
//           deskPhoto: groupedImages.desk?.['1x'] || "",
//           deskPhoto2x: groupedImages.desk?.['2x'] || "",
//           tabPhoto: groupedImages.tab?.['1x'] || "",
//           tabPhoto2x: groupedImages.tab?.['2x'] || "",
//           mobPhoto: groupedImages.mob?.['1x'] || "",
//           mobPhoto2x: groupedImages.mob?.['2x'] || "",
//         },
//       };
//     });

//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Помилка сервера", error: error.message });
//   }
// });

// module.exports = router;

