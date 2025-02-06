const { fetchCloudinaryImages } = require("../../services/api");
const Gallery = require("../../models/gallery"); 
async function syncGallery (req, res) {
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
};

module.exports = syncGallery