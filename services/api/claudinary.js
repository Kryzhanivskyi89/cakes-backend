
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
const { v2: cloudinary } = require("cloudinary");

// Налаштування Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
  debug: true,
});

// Функція для отримання зображень
async function fetchCloudinaryImages(folderName) {
  try {
    // Використовуємо `search` API для пошуку зображень у папці
    const result = await cloudinary.search
      .expression(`folder="switlanacakes/gallery/${folderName}"`)
      .max_results(500) 
      .execute();

    console.log("Cloudinary Response:", result.resources);
    
    return result.resources.map((image) => ({
      url: image.secure_url,
      public_id: image.public_id,
      format: image.format,
    }));
  } catch (error) {
    console.error("Помилка при отриманні зображень з Cloudinary:", error.message);
    throw error;
  }
}

module.exports = { fetchCloudinaryImages };
