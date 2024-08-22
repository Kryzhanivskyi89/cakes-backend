const nodemailer = require("nodemailer");

const { GMAIL_PASSWORD, GMAIL_EMAIL } = process.env;

// Налаштування Nodemailer
const nodemailerConfig = {
  service: 'gmail',
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

// Функція для надсилання електронної пошти
const sendEmail = (order) => {
  const mailOptions = {
    from: GMAIL_EMAIL,
    to: 'ecolog.506@gmail.com',
    subject: 'New Order Received',
    text: `A new order has been received: ${order.description}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        return resolve(info);
      }
    });
  });
};


// const sendEmail = async (data) => {
//   const email = { ...data, from: GMAIL_EMAIL };
//   await transporter
//     .sendMail(email)
//     .then(() => console.log("Email send success"))
//     .catch((error) => console.log(error.message));
//   return true;
// };

module.exports = sendEmail;