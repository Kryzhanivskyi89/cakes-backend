const Order = require('../../models/orders');

const sendEmail = require('../..//helpers/sendEmail')

const addOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    await sendEmail(newOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to create order' });
  }
};

// module.exports = {
//   addOrder: ctrlWrapper(addOrder),
// };

module.exports = addOrder