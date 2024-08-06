// const app = require('./app');
require('dotenv').config();
require("colors");

// const mongoose = require('mongoose');

const { DB_HOST, PORT } = process.env;

// mongoose.set("strictQuery", false);

// const connectDB = async () => {
//   try {
//     const db = await mongoose.connect(DB_HOST);
//     console.log(
//       `Database is connected. Name:${db.connection.name}. Port:${db.connection.port}. Host:${db.connection.host}`
//         .green.italic.bold
//     );
//   } catch (error) {
//     console.log(error.message.red.bold);
//   }
// };

// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`.blue.bold);
//     });
//   })
//   .catch((error) => {
//     console.log(error.message.red.bold);
//     process.exit(1);
//   });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ordersRouter = require('./routes/orders'); // Правильний імпорт

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`Database is connected`  .green.italic.bold))
  .catch((error) => {
    console.error('Database connection error:'.red.bold);
    process.exit(1);
  });

app.use('/orders', ordersRouter); // Використання маршруту

// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.italic.bold);
});