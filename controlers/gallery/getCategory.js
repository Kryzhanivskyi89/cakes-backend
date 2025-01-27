const Gallery = require("../../models/gallery"); // Модель для роботи з базою даних

async function getCategory (req, res) {
  const { category } = req.params;

  try {
    const products = await Gallery.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні продуктів", error: error.message });
  }
}
module.exports = getCategory