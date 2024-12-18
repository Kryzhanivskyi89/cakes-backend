// const axios = require("axios");

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
const { v2: cloudinary } = require("cloudinary");

// Налаштування Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME, // Замість рядків використовуйте змінні оточення
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
      .max_results(500) // Максимальна кількість результатів
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

// async function fetchCloudinaryImages(folderName) {
//   try {
//     const response = await axios.get(
//       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image`,
//       {
//         params: { prefix: `switlanacakes/gallery/${folderName}`, type: "upload", max_results: 500 },
//         auth: {
//           username: API_KEY,
//           password: API_SECRET,
//         },
//       }
//     );
//     console.log("Cloudinary Response:", response.data.resources); 
//     return response.data.resources.map((image) => ({
//       url: image.secure_url,
//       public_id: image.public_id,
//       format: image.format,
//     }));
//   } catch (error) {
//     console.error("Помилка при отриманні зображень з Cloudinary:", error.message);
//     throw error;
//   }
// }

// module.exports = { fetchCloudinaryImages };