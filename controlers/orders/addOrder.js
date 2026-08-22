const Order = require('../../models/orders');

const sendEmail = require('../../helpers/sendEmail')

const sendTelegram = require('../../helpers/sendTelegram');

const addOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);

    Promise.allSettled([
      sendEmail(newOrder),
      sendTelegram(newOrder),
    ]).then((results) => {
      results.forEach((result, i) => {
        const label = i === 0 ? 'Email' : 'Telegram';
        if (result.status === 'rejected') {
          console.error(`${label} сповіщення не надіслано:`, result.reason);
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to create order' });
  }
};

// const addOrder = async (req, res) => {
//   try {
//     const newOrder = await Order.create(req.body);
//     await sendEmail(newOrder);
//     res.status(201).json(newOrder);
//   } catch (error) {
//     res.status(500).json({ message: error.message || 'Failed to create order' });
//   }
// };


module.exports = addOrder



