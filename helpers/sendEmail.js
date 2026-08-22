

const { Resend } = require('resend');

const { RESEND_API_KEY } = process.env;

const resend = new Resend(RESEND_API_KEY);

const sendEmail = async (order) => {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'ecolog.506@gmail.com',
    subject: 'Нове замовлення',
    text: `Отримано нове замовлення від: ${order.name}
          Номер телефону: ${order.phone}
          Опис: ${order.description}
          Деталі: ${JSON.stringify(order, null, 2)}`,
  });

  if (error) {
    console.error('Помилка надсилання листа:', error);
    throw error;
  }

  console.log('Лист успішно надіслано:', data.id);
  return data;
};

module.exports = sendEmail;


// const nodemailer = require("nodemailer");

// const { GMAIL_PASSWORD, GMAIL_EMAIL } = process.env;

// // Налаштування Nodemailer
// const nodemailerConfig = {
//   service: 'gmail',
//   auth: {
//     user: GMAIL_EMAIL,
//     pass: GMAIL_PASSWORD,
//   },
// };

// const transporter = nodemailer.createTransport(nodemailerConfig);

// const sendEmail = (order) => {
//   const mailOptions = {
//     from: GMAIL_EMAIL,
//     to: 'ecolog.506@gmail.com',
//     subject: 'Нове замовлення',
//     text: `Отримано нове замовлення від: ${order.name}
//     Номер телефону: ${order.phone}
//     Опис: ${order.description}
//     Деталі: ${JSON.stringify(order, null, 2)}`,
//   };


//   return new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Помилка надсилання листа:', {
//           errorMessage: error.message,
//           errorStack: error.stack,
//           order: order
//         });
//         return reject(error);
//       } else {
//         console.log('Лист успішно надіслано:', info.response);
//         return resolve(info);
//       }
//     });
//   });
// };


// module.exports = sendEmail;