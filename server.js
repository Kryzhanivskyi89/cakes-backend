const app = require('./app');
require('dotenv').config();
require("colors");

const mongoose = require('mongoose');

const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const db = await mongoose.connect(DB_HOST);
    console.log(
      `Database is connected. Name:${db.connection.name}. Port:${db.connection.port}. Host:${db.connection.host}`
        .green.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
  }
};

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`.blue.bold);
    });
  })
  .catch((error) => {
    console.log(error.message.red.bold);
    process.exit(1);
  });