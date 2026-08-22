const https = require('https');

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

const sendTelegram = (order) => {
  const text = `🆕 Нове замовлення
Ім'я: ${order.name}
Телефон: ${order.phone}
Опис: ${order.description || '-'}
Деталі: ${JSON.stringify(order, null, 2)}`;

  const payload = JSON.stringify({
    chat_id: TELEGRAM_CHAT_ID,
    text,
    parse_mode: 'HTML',
  });

  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('Telegram-сповіщення надіслано:', data);
          resolve(JSON.parse(data));
        } else {
          console.error('Помилка Telegram API:', data);
          reject(new Error(data));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Помилка надсилання в Telegram:', error.message);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
};

module.exports = sendTelegram;